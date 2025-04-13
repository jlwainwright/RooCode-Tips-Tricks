/**
 * Technical Knowledge Extractor
 * 
 * This script extracts technical knowledge from handoff documents
 * and consolidates it into a knowledge base document.
 * 
 * Usage: node knowledge-extractor.js [handoffs-directory] [output-file]
 * Default: node knowledge-extractor.js handoffs knowledge-base.md
 */

const fs = require('fs');
const path = require('path');

/**
 * Extract knowledge from handoff documents and generate a knowledge base
 * @param {string} handoffsDir - Directory containing handoff files
 * @param {string} outputFile - File to write the knowledge base to
 */
function extractKnowledgeBase(handoffsDir = 'handoffs', outputFile = 'knowledge-base.md') {
  try {
    // Check if directory exists
    if (!fs.existsSync(handoffsDir)) {
      console.error(`Directory '${handoffsDir}' does not exist.`);
      return;
    }
    
    let problemSolutions = [];
    let discoveries = [];
    let codeHealth = [];
    let dependencies = [];
    
    // Read all handoff files
    console.log(`Scanning directory: ${handoffsDir}`);
    
    const files = fs.readdirSync(handoffsDir)
      .filter(file => {
        const filePath = path.join(handoffsDir, file);
        return fs.statSync(filePath).isFile() && file.endsWith('.md');
      })
      .sort(); // Sort to process in order
    
    console.log(`Found ${files.length} markdown files`);
    
    // Process each file
    for (const file of files) {
      console.log(`Processing: ${file}`);
      const filePath = path.join(handoffsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract Problems & Solutions section
      const problemMatch = content.match(/## Problems (?:&|and) Solutions\n([\s\S]*?)(?=\n## |$)/i);
      if (problemMatch && problemMatch[1]) {
        console.log(`  - Found Problems & Solutions section`);
        problemSolutions.push({
          source: file,
          content: problemMatch[1].trim()
        });
      }
      
      // Extract Discoveries section
      const discoveryMatch = content.match(/## Discoveries\n([\s\S]*?)(?=\n## |$)/i);
      if (discoveryMatch && discoveryMatch[1]) {
        console.log(`  - Found Discoveries section`);
        discoveries.push({
          source: file,
          content: discoveryMatch[1].trim()
        });
      }
      
      // Extract Code Health Metrics section
      const healthMatch = content.match(/## Code Health Metrics\n([\s\S]*?)(?=\n## |$)/i);
      if (healthMatch && healthMatch[1]) {
        console.log(`  - Found Code Health Metrics section`);
        codeHealth.push({
          source: file,
          content: healthMatch[1].trim()
        });
      }
      
      // Extract Dependency Updates section
      const depMatch = content.match(/## Dependency Updates\n([\s\S]*?)(?=\n## |$)/i);
      if (depMatch && depMatch[1]) {
        console.log(`  - Found Dependency Updates section`);
        dependencies.push({
          source: file,
          content: depMatch[1].trim()
        });
      }
    }
    
    // Generate knowledge base document
    console.log(`Generating knowledge base document: ${outputFile}`);
    
    let kb = `# Technical Knowledge Base\n\n`;
    kb += `*Generated on ${new Date().toISOString().split('T')[0]} from ${files.length} handoff documents*\n\n`;
    kb += `## Table of Contents\n\n`;
    kb += `- [Problems & Solutions](#problems--solutions)\n`;
    kb += `- [Key Discoveries](#key-discoveries)\n`;
    
    if (codeHealth.length > 0) {
      kb += `- [Code Health Trends](#code-health-trends)\n`;
    }
    
    if (dependencies.length > 0) {
      kb += `- [Dependency History](#dependency-history)\n`;
    }
    
    kb += `\n## Problems & Solutions\n\n`;
    
    if (problemSolutions.length === 0) {
      kb += `*No problems and solutions documented yet.*\n\n`;
    } else {
      problemSolutions.forEach(ps => {
        kb += `### From ${ps.source}\n\n${ps.content}\n\n`;
      });
    }
    
    kb += `## Key Discoveries\n\n`;
    
    if (discoveries.length === 0) {
      kb += `*No discoveries documented yet.*\n\n`;
    } else {
      discoveries.forEach(d => {
        kb += `### From ${d.source}\n\n${d.content}\n\n`;
      });
    }
    
    if (codeHealth.length > 0) {
      kb += `## Code Health Trends\n\n`;
      codeHealth.forEach(ch => {
        kb += `### From ${ch.source}\n\n${ch.content}\n\n`;
      });
    }
    
    if (dependencies.length > 0) {
      kb += `## Dependency History\n\n`;
      dependencies.forEach(d => {
        kb += `### From ${d.source}\n\n${d.content}\n\n`;
      });
    }
    
    fs.writeFileSync(outputFile, kb);
    console.log(`Knowledge base extracted to ${outputFile}`);
    
  } catch (error) {
    console.error('Error extracting knowledge:', error.message);
  }
}

// Run if called directly (not imported)
if (require.main === module) {
  const handoffsDir = process.argv[2] || 'handoffs';
  const outputFile = process.argv[3] || 'knowledge-base.md';
  extractKnowledgeBase(handoffsDir, outputFile);
}

module.exports = { extractKnowledgeBase };
