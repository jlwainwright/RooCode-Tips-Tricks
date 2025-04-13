/**
 * Project Health Dashboard Generator
 * 
 * This script creates a visual dashboard of project health metrics
 * by extracting and charting data from handoff documents.
 * 
 * Usage: node project-health-dashboard.js [handoffs-directory] [output-file]
 * Default: node project-health-dashboard.js handoffs project-health.md
 */

const fs = require('fs');
const path = require('path');

/**
 * Extract numeric value from a text containing a percentage
 * @param {string} text - Text containing a percentage
 * @returns {number} The percentage value or null if not found
 */
function extractPercentage(text) {
  const match = text.match(/(\d+)%/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Extract test counts from text
 * @param {string} text - Text containing test counts
 * @returns {Object} Object with passing and total counts
 */
function extractTestCounts(text) {
  const match = text.match(/(\d+)\/(\d+) passing/);
  if (match) {
    return {
      passing: parseInt(match[1], 10),
      total: parseInt(match[2], 10)
    };
  }
  return null;
}

/**
 * Generate a Mermaid chart for a metric
 * @param {string} title - Chart title
 * @param {string} yAxisLabel - Y-axis label
 * @param {Array<string>} labels - X-axis labels
 * @param {Array<number>} values - Data points
 * @returns {string} Mermaid chart definition
 */
function generateMermaidChart(title, yAxisLabel, labels, values) {
  return `
\`\`\`mermaid
xychart-beta
  title "${title}"
  x-axis [${labels.map(l => `"${l}"`).join(", ")}]
  y-axis "${yAxisLabel}"
  bar [${values.join(", ")}]
\`\`\`
`;
}

/**
 * Generate project health dashboard
 * @param {string} handoffsDir - Directory containing handoff files
 * @param {string} outputFile - File to write the dashboard to
 */
function generateHealthDashboard(handoffsDir = 'handoffs', outputFile = 'project-health.md') {
  try {
    // Check if directory exists
    if (!fs.existsSync(handoffsDir)) {
      console.error(`Directory '${handoffsDir}' does not exist.`);
      return;
    }
    
    // Metrics to track
    const metrics = {
      testCoverage: [],
      testsPassing: { passing: [], total: [] },
      apiEndpoints: [],
      techDebt: [],
      docCoverage: []
    };
    
    // Handoff file identifiers for x-axis
    const handoffLabels = [];
    
    // Process all handoff files chronologically
    const files = fs.readdirSync(handoffsDir)
      .filter(file => {
        const filePath = path.join(handoffsDir, file);
        return fs.statSync(filePath).isFile() && file.match(/^\d+-.*\.md$/);
      })
      .sort();
    
    console.log(`Found ${files.length} handoff files to process`);
    
    // Process each file
    for (const file of files) {
      console.log(`Processing: ${file}`);
      const shortLabel = file.replace('.md', '');
      handoffLabels.push(shortLabel);
      
      const filePath = path.join(handoffsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract test coverage
      const coverageMatch = content.match(/Test Coverage.*?(\d+)%/);
      metrics.testCoverage.push(coverageMatch ? parseInt(coverageMatch[1], 10) : null);
      
      // Extract technical debt counts
      const debtMatch = content.match(/Technical Debt.*?(\d+)\s+TODOs/i);
      metrics.techDebt.push(debtMatch ? parseInt(debtMatch[1], 10) : null);
      
      // Extract documentation coverage
      const docMatch = content.match(/Documentation.*?(\d+)%/i);
      metrics.docCoverage.push(docMatch ? parseInt(docMatch[1], 10) : null);
      
      // Count API endpoints
      const apiMatch = content.match(/## API Endpoints Catalog/i);
      if (apiMatch) {
        const apiTable = content.split('## API Endpoints Catalog')[1].split('##')[0];
        const apiLines = apiTable.split('\n').filter(line => line.includes('|') && !line.includes('--|--'));
        metrics.apiEndpoints.push(apiLines.length - 1); // Subtract header row
      } else {
        metrics.apiEndpoints.push(null);
      }
    }
    
    // Generate dashboard with charts
    console.log('Generating dashboard...');
    let dashboard = `# Project Health Dashboard\n\n`;
    dashboard += `*Generated on ${new Date().toISOString().split('T')[0]} from ${files.length} handoff documents*\n\n`;
    
    // Add test coverage chart if we have data
    if (metrics.testCoverage.some(v => v !== null)) {
      dashboard += `## Test Coverage Trend\n\n`;
      dashboard += generateMermaidChart("Test Coverage Over Time", "Coverage %", handoffLabels, metrics.testCoverage);
      dashboard += '\n\n';
    }
    
    // Add API endpoints chart
    if (metrics.apiEndpoints.some(v => v !== null)) {
      dashboard += `## API Growth\n\n`;
      dashboard += generateMermaidChart("API Endpoints Growth", "Number of Endpoints", handoffLabels, metrics.apiEndpoints);
      dashboard += '\n\n';
    }
    
    // Add technical debt chart
    if (metrics.techDebt.some(v => v !== null)) {
      dashboard += `## Technical Debt Trend\n\n`;
      dashboard += generateMermaidChart("Technical Debt Items", "Number of TODOs", handoffLabels, metrics.techDebt);
      dashboard += '\n\n';
    }
    
    // Add documentation coverage chart
    if (metrics.docCoverage.some(v => v !== null)) {
      dashboard += `## Documentation Coverage\n\n`;
      dashboard += generateMermaidChart("Documentation Coverage", "Coverage %", handoffLabels, metrics.docCoverage);
      dashboard += '\n\n';
    }
    
    // Write dashboard to file
    fs.writeFileSync(outputFile, dashboard);
    console.log(`Dashboard generated successfully: ${outputFile}`);
    
  } catch (error) {
    console.error('Error generating dashboard:', error);
  }
}

/**
 * Main function to handle CLI arguments and run the dashboard generator
 */
function main() {
  const args = process.argv.slice(2);
  const handoffsDir = args[0] || 'handoffs';
  const outputFile = args[1] || 'project-health.md';
  
  console.log(`Generating project health dashboard from '${handoffsDir}' to '${outputFile}'`);
  generateHealthDashboard(handoffsDir, outputFile);
}

// Run the script if executed directly
if (require.main === module) {
  main();
}

// Export functions for potential testing or reuse
module.exports = {
  extractPercentage,
  extractTestCounts,
  generateMermaidChart,
  generateHealthDashboard
}; 