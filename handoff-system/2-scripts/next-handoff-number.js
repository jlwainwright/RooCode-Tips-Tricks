/**
 * Next Handoff Number Generator
 * 
 * This script automatically determines the next handoff number
 * by scanning the handoffs directory for existing handoff files.
 * 
 * Usage: node next-handoff-number.js [handoffs-directory]
 * Default directory: handoffs
 */

const fs = require('fs');
const path = require('path');

/**
 * Get the next handoff number by scanning a directory
 * @param {string} handoffsDir - Directory containing handoff files
 * @returns {number} The next handoff number to use
 */
function getNextHandoffNumber(handoffsDir = 'handoffs') {
  try {
    // Check if directory exists
    if (!fs.existsSync(handoffsDir)) {
      console.error(`Directory '${handoffsDir}' does not exist.`);
      console.log('Creating handoffs directory...');
      fs.mkdirSync(handoffsDir, { recursive: true });
      return 1; // First handoff
    }
    
    // Read all files in the handoffs directory
    const files = fs.readdirSync(handoffsDir)
      .filter(file => {
        const filePath = path.join(handoffsDir, file);
        return fs.statSync(filePath).isFile();
      })
      .filter(file => file.match(/^\d+-.*\.md$/));
    
    // Extract numbers from filenames
    const numbers = files.map(file => {
      const match = file.match(/^(\d+)-/);
      return match ? parseInt(match[1], 10) : 0;
    });
    
    // Find the highest number and add 1
    const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
    
    console.log(`Next handoff number: ${nextNumber}`);
    console.log(`Suggested filename: ${nextNumber}-descriptive-name.md`);
    
    return nextNumber;
  } catch (error) {
    console.error('Error determining next handoff number:', error.message);
    return -1;
  }
}

// Run if called directly (not imported)
if (require.main === module) {
  const handoffsDir = process.argv[2] || 'handoffs';
  getNextHandoffNumber(handoffsDir);
}

module.exports = { getNextHandoffNumber };
