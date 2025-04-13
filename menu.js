/**
 * RooCode-Tips-Tricks Interactive Menu
 * 
 * This script provides an easy way to navigate and use the tools
 * and templates in the RooCode-Tips-Tricks repository.
 * 
 * To use, run: node menu.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync, spawn } = require('child_process');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

/**
 * Helper function to display a colorful header
 */
function showHeader() {
  console.clear();
  console.log(`${colors.fg.cyan}${colors.bright}========================================${colors.reset}`);
  console.log(`${colors.fg.yellow}${colors.bright}  RooCode-Tips-Tricks Interactive Menu${colors.reset}`);
  console.log(`${colors.fg.cyan}${colors.bright}========================================${colors.reset}`);
  console.log();
}

/**
 * Main menu display and handler
 */
function showMainMenu() {
  showHeader();
  console.log(`${colors.fg.green}What would you like to do?${colors.reset}`);
  console.log();
  console.log(`${colors.bright}1.${colors.reset} Install handoff manager`);
  console.log(`${colors.bright}2.${colors.reset} Create a new handoff document`);
  console.log(`${colors.bright}3.${colors.reset} Create a milestone`);
  console.log(`${colors.bright}4.${colors.reset} Generate a workflow diagram`);
  console.log(`${colors.bright}5.${colors.reset} Extract knowledge from handoffs`);
  console.log(`${colors.bright}6.${colors.reset} Browse handoff templates`);
  console.log(`${colors.bright}7.${colors.reset} Read documentation`);
  console.log(`${colors.bright}8.${colors.reset} Setup Boomerang mode`);
  console.log(`${colors.bright}9.${colors.reset} Exit`);
  console.log();
  
  rl.question(`${colors.fg.yellow}Enter your choice (1-9): ${colors.reset}`, (answer) => {
    switch(answer.trim()) {
      case '1':
        installHandoffManager();
        break;
      case '2':
        createHandoff();
        break;
      case '3':
        createMilestone();
        break;
      case '4':
        generateWorkflowDiagram();
        break;
      case '5':
        extractKnowledge();
        break;
      case '6':
        browseTemplates();
        break;
      case '7':
        readDocumentation();
        break;
      case '8':
        setupBoomerangMode();
        break;
      case '9':
        rl.close();
        console.log(`${colors.fg.green}Goodbye!${colors.reset}`);
        break;
      default:
        console.log(`${colors.fg.red}Invalid option. Please try again.${colors.reset}`);
        setTimeout(showMainMenu, 1500);
    }
  });
}

/**
 * Install the handoff manager
 */
function installHandoffManager() {
  showHeader();
  console.log(`${colors.fg.yellow}Installing Handoff Manager...${colors.reset}`);
  console.log();
  console.log('This will install the handoff manager to your project.');
  console.log();
  
  rl.question(`${colors.fg.cyan}Continue? (y/n): ${colors.reset}`, (answer) => {
    if (answer.toLowerCase() === 'y') {
      try {
        execSync('node handoff-manager-installer.js', { stdio: 'inherit' });
        console.log();
        console.log(`${colors.fg.green}Installation complete!${colors.reset}`);
      } catch (error) {
        console.log();
        console.log(`${colors.fg.red}Installation failed: ${error.message}${colors.reset}`);
      }
      
      rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
        showMainMenu();
      });
    } else {
      showMainMenu();
    }
  });
}

/**
 * Create a new handoff document
 */
function createHandoff() {
  showHeader();
  console.log(`${colors.fg.yellow}Create New Handoff Document${colors.reset}`);
  console.log();
  
  // Get next handoff number
  let nextNumber;
  try {
    const scriptPath = path.join(__dirname, 'handoff-system', '2-scripts', 'next-handoff-number.js');
    const output = execSync(`node "${scriptPath}" handoffs`).toString();
    const match = output.match(/Next handoff number: (\d+)/);
    nextNumber = match ? match[1] : 'X';
  } catch (error) {
    nextNumber = 'X';
  }
  
  rl.question(`${colors.fg.cyan}Enter handoff description (e.g., api-implementation): ${colors.reset}`, (description) => {
    if (!description.trim()) {
      console.log(`${colors.fg.red}Description cannot be empty${colors.reset}`);
      setTimeout(createHandoff, 1500);
      return;
    }
    
    const sanitizedDesc = description.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const filename = `${nextNumber}-${sanitizedDesc}.md`;
    const filepath = path.join(__dirname, 'handoffs', filename);
    
    // Create handoffs directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, 'handoffs'))) {
      fs.mkdirSync(path.join(__dirname, 'handoffs'), { recursive: true });
    }
    
    // Generate handoff content from template
    const today = new Date().toISOString().split('T')[0];
    const content = `# ${description} Handoff - ${today}

## Summary
[2-3 sentence overview]

## Priority Development Requirements (PDR)
- **HIGH**: [Must address immediately]
- **MEDIUM**: [Address soon]
- **LOW**: [Be aware]

## Discoveries
- [Unexpected finding 1]
- [Unexpected finding 2]

## Problems & Solutions
- **Problem**: [Issue description]
  **Solution**: [Solution applied]

## Work in Progress
- [Task 1]: [Progress %]
- [Task 2]: [Progress %]

## Code Health Metrics
- **Test Coverage**: [percentage]% ([paths covered]/[total paths])
- **Linting Status**: [pass/partial/fail] ([issues count] issues)
- **Documentation**: [percentage]% of public APIs documented
- **Technical Debt**: [count] TODOs/FIXMEs in codebase

## Deviations
- [Changed X to Y because Z]

## References
- [doc/path1]
- [doc/path2]
`;
    
    fs.writeFileSync(filepath, content);
    console.log();
    console.log(`${colors.fg.green}Handoff document created: ${filename}${colors.reset}`);
    console.log();
    
    rl.question(`${colors.fg.cyan}Would you like to open this file in your default editor? (y/n): ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() === 'y') {
        try {
          // Cross-platform file opening
          const command = process.platform === 'win32' ? 'start' : 
                         process.platform === 'darwin' ? 'open' : 'xdg-open';
          execSync(`${command} "${filepath}"`);
        } catch (error) {
          console.log(`${colors.fg.red}Couldn't open the file: ${error.message}${colors.reset}`);
        }
      }
      
      rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
        showMainMenu();
      });
    });
  });
}

/**
 * Create a milestone
 */
function createMilestone() {
  showHeader();
  console.log(`${colors.fg.yellow}Create Milestone${colors.reset}`);
  console.log();
  
  rl.question(`${colors.fg.cyan}Enter milestone name (e.g., api-phase-1): ${colors.reset}`, (milestoneName) => {
    if (!milestoneName.trim()) {
      console.log(`${colors.fg.red}Milestone name cannot be empty${colors.reset}`);
      setTimeout(createMilestone, 1500);
      return;
    }
    
    const sanitizedName = milestoneName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    console.log();
    console.log(`${colors.fg.green}Creating milestone: ${sanitizedName}${colors.reset}`);
    
    // Find the appropriate milestone script based on platform
    let scriptPath;
    if (fs.existsSync(path.join(__dirname, 'handoff-system', '2-scripts', '2-create-milestone.js'))) {
      scriptPath = path.join(__dirname, 'handoff-system', '2-scripts', '2-create-milestone.js');
      try {
        execSync(`node "${scriptPath}" "${sanitizedName}"`, { stdio: 'inherit' });
        console.log();
        console.log(`${colors.fg.green}Milestone created successfully!${colors.reset}`);
      } catch (error) {
        console.log();
        console.log(`${colors.fg.red}Failed to create milestone: ${error.message}${colors.reset}`);
      }
    } else if (fs.existsSync(path.join(__dirname, 'handoff-system', '2-scripts', '2-create-milestone.py'))) {
      scriptPath = path.join(__dirname, 'handoff-system', '2-scripts', '2-create-milestone.py');
      try {
        execSync(`python "${scriptPath}" "${sanitizedName}"`, { stdio: 'inherit' });
        console.log();
        console.log(`${colors.fg.green}Milestone created successfully!${colors.reset}`);
      } catch (error) {
        console.log();
        console.log(`${colors.fg.red}Failed to create milestone: ${error.message}${colors.reset}`);
      }
    } else {
      console.log(`${colors.fg.red}Milestone creation script not found.${colors.reset}`);
    }
    
    rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
      showMainMenu();
    });
  });
}

/**
 * Generate a workflow diagram
 */
function generateWorkflowDiagram() {
  showHeader();
  console.log(`${colors.fg.yellow}Generate Workflow Diagram${colors.reset}`);
  console.log();
  console.log(`${colors.fg.cyan}Available diagram types:${colors.reset}`);
  console.log();
  console.log(`${colors.bright}1.${colors.reset} Data Flow`);
  console.log(`${colors.bright}2.${colors.reset} Authentication Flow`);
  console.log(`${colors.bright}3.${colors.reset} API Request Flow`);
  console.log(`${colors.bright}4.${colors.reset} Event-Driven Architecture`);
  console.log(`${colors.bright}5.${colors.reset} CRUD Operations Flow`);
  console.log(`${colors.bright}6.${colors.reset} Error Handling Flow`);
  console.log(`${colors.bright}7.${colors.reset} Testing Workflow`);
  console.log(`${colors.bright}8.${colors.reset} CI/CD Pipeline`);
  console.log(`${colors.bright}9.${colors.reset} Back to Main Menu`);
  console.log();
  
  rl.question(`${colors.fg.yellow}Select diagram type (1-9): ${colors.reset}`, (answer) => {
    if (answer === '9') {
      showMainMenu();
      return;
    }
    
    const diagramTypes = [
      'dataFlow',
      'authentication',
      'apiRequest',
      'eventDriven',
      'crudFlow',
      'errorHandling',
      'testingFlow',
      'cicdPipeline'
    ];
    
    const index = parseInt(answer, 10) - 1;
    if (index >= 0 && index < diagramTypes.length) {
      const diagramType = diagramTypes[index];
      const scriptPath = path.join(__dirname, 'handoff-system', '2-scripts', 'generate-workflow-diagram.js');
      
      console.log();
      console.log(`${colors.fg.green}Generating ${diagramType} diagram...${colors.reset}`);
      console.log();
      
      try {
        const output = execSync(`node "${scriptPath}" ${diagramType}`).toString();
        console.log(output);
        
        // Write to file
        const filename = `${diagramType}-diagram.md`;
        fs.writeFileSync(filename, output);
        console.log(`${colors.fg.green}Diagram saved to ${filename}${colors.reset}`);
      } catch (error) {
        console.log(`${colors.fg.red}Failed to generate diagram: ${error.message}${colors.reset}`);
      }
    } else {
      console.log(`${colors.fg.red}Invalid selection${colors.reset}`);
    }
    
    rl.question(`${colors.fg.yellow}Press Enter to return...${colors.reset}`, () => {
      generateWorkflowDiagram();
    });
  });
}

/**
 * Extract knowledge from handoffs
 */
function extractKnowledge() {
  showHeader();
  console.log(`${colors.fg.yellow}Extract Knowledge from Handoffs${colors.reset}`);
  console.log();
  
  rl.question(`${colors.fg.cyan}Enter output filename (default: knowledge-base.md): ${colors.reset}`, (filename) => {
    const outputFile = filename.trim() || 'knowledge-base.md';
    console.log();
    console.log(`${colors.fg.green}Extracting knowledge to ${outputFile}...${colors.reset}`);
    
    const scriptPath = path.join(__dirname, 'handoff-system', '2-scripts', 'knowledge-extractor.js');
    try {
      execSync(`node "${scriptPath}" handoffs "${outputFile}"`, { stdio: 'inherit' });
      console.log();
      console.log(`${colors.fg.green}Knowledge extraction complete!${colors.reset}`);
      
      rl.question(`${colors.fg.cyan}Open the knowledge base file? (y/n): ${colors.reset}`, (answer) => {
        if (answer.toLowerCase() === 'y') {
          try {
            // Cross-platform file opening
            const command = process.platform === 'win32' ? 'start' : 
                           process.platform === 'darwin' ? 'open' : 'xdg-open';
            execSync(`${command} "${outputFile}"`);
          } catch (error) {
            console.log(`${colors.fg.red}Couldn't open the file: ${error.message}${colors.reset}`);
          }
        }
        
        rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
          showMainMenu();
        });
      });
    } catch (error) {
      console.log();
      console.log(`${colors.fg.red}Extraction failed: ${error.message}${colors.reset}`);
      
      rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
        showMainMenu();
      });
    }
  });
}

/**
 * Browse handoff templates
 */
function browseTemplates() {
  showHeader();
  console.log(`${colors.fg.yellow}Browse Handoff Templates${colors.reset}`);
  console.log();
  
  const templatesDir = path.join(__dirname, 'handoff-system', 'template-extensions');
  
  // Check if template directory exists
  if (!fs.existsSync(templatesDir)) {
    console.log(`${colors.fg.red}Template directory not found.${colors.reset}`);
    rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
      showMainMenu();
    });
    return;
  }
  
  // List template files
  const templates = fs.readdirSync(templatesDir)
    .filter(file => file.endsWith('.md'))
    .map((file, index) => {
      const name = file.replace(/-template\.md$/, '').replace(/-/g, ' ');
      return {
        index: index + 1,
        file,
        name: name.charAt(0).toUpperCase() + name.slice(1)
      };
    });
  
  if (templates.length === 0) {
    console.log(`${colors.fg.red}No templates found.${colors.reset}`);
    rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
      showMainMenu();
    });
    return;
  }
  
  console.log(`${colors.fg.cyan}Available templates:${colors.reset}`);
  console.log();
  templates.forEach(template => {
    console.log(`${colors.bright}${template.index}.${colors.reset} ${template.name}`);
  });
  console.log(`${colors.bright}${templates.length + 1}.${colors.reset} Back to Main Menu`);
  console.log();
  
  rl.question(`${colors.fg.yellow}Select template to view (1-${templates.length + 1}): ${colors.reset}`, (answer) => {
    const selection = parseInt(answer, 10);
    
    if (selection === templates.length + 1) {
      showMainMenu();
      return;
    }
    
    if (selection > 0 && selection <= templates.length) {
      const template = templates[selection - 1];
      const templatePath = path.join(templatesDir, template.file);
      
      console.log();
      console.log(`${colors.fg.green}${colors.bright}${template.name} Template${colors.reset}`);
      console.log();
      
      try {
        const content = fs.readFileSync(templatePath, 'utf8');
        console.log(content);
      } catch (error) {
        console.log(`${colors.fg.red}Failed to read template: ${error.message}${colors.reset}`);
      }
    } else {
      console.log(`${colors.fg.red}Invalid selection${colors.reset}`);
    }
    
    rl.question(`${colors.fg.yellow}Press Enter to return...${colors.reset}`, () => {
      browseTemplates();
    });
  });
}

/**
 * Read documentation
 */
function readDocumentation() {
  showHeader();
  console.log(`${colors.fg.yellow}Read Documentation${colors.reset}`);
  console.log();
  
  const docsDir = path.join(__dirname, 'handoff-system', '0-instructions');
  
  // Check if documentation directory exists
  if (!fs.existsSync(docsDir)) {
    console.log(`${colors.fg.red}Documentation directory not found.${colors.reset}`);
    rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
      showMainMenu();
    });
    return;
  }
  
  // List documentation files
  const docs = fs.readdirSync(docsDir)
    .filter(file => file.endsWith('.md'))
    .map((file, index) => {
      const name = file.replace(/^\d+-/, '').replace(/\.md$/, '').replace(/-/g, ' ');
      return {
        index: index + 1,
        file,
        name: name.charAt(0).toUpperCase() + name.slice(1)
      };
    });
  
  if (docs.length === 0) {
    console.log(`${colors.fg.red}No documentation found.${colors.reset}`);
    rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
      showMainMenu();
    });
    return;
  }
  
  console.log(`${colors.fg.cyan}Available documentation:${colors.reset}`);
  console.log();
  docs.forEach(doc => {
    console.log(`${colors.bright}${doc.index}.${colors.reset} ${doc.name}`);
  });
  console.log(`${colors.bright}${docs.length + 1}.${colors.reset} Back to Main Menu`);
  console.log();
  
  rl.question(`${colors.fg.yellow}Select documentation to view (1-${docs.length + 1}): ${colors.reset}`, (answer) => {
    const selection = parseInt(answer, 10);
    
    if (selection === docs.length + 1) {
      showMainMenu();
      return;
    }
    
    if (selection > 0 && selection <= docs.length) {
      const doc = docs[selection - 1];
      const docPath = path.join(docsDir, doc.file);
      
      // Open documentation in default editor/viewer
      try {
        const command = process.platform === 'win32' ? 'start' : 
                       process.platform === 'darwin' ? 'open' : 'xdg-open';
        execSync(`${command} "${docPath}"`);
        console.log(`${colors.fg.green}Opening documentation...${colors.reset}`);
      } catch (error) {
        console.log(`${colors.fg.red}Failed to open documentation: ${error.message}${colors.reset}`);
        console.log();
        
        // Fall back to console display
        try {
          const content = fs.readFileSync(docPath, 'utf8');
          console.log(content);
        } catch (readError) {
          console.log(`${colors.fg.red}Failed to read documentation: ${readError.message}${colors.reset}`);
        }
      }
    } else {
      console.log(`${colors.fg.red}Invalid selection${colors.reset}`);
    }
    
    rl.question(`${colors.fg.yellow}Press Enter to return...${colors.reset}`, () => {
      readDocumentation();
    });
  });
}

/**
 * Setup Boomerang mode
 */
function setupBoomerangMode() {
  showHeader();
  console.log(`${colors.fg.yellow}Setup Boomerang Mode${colors.reset}`);
  console.log();
  console.log(`${colors.fg.cyan}This will configure Boomerang mode in your .roomodes file.${colors.reset}`);
  console.log(`${colors.fg.cyan}Boomerang mode allows tasks to be scheduled for future execution.${colors.reset}`);
  console.log();
  
  rl.question(`${colors.fg.green}Continue with setup? (y/n): ${colors.reset}`, (answer) => {
    if (answer.toLowerCase() !== 'y') {
      showMainMenu();
      return;
    }
    
    // Check if .roomodes file exists
    const roomodesPath = path.join(process.cwd(), '.roomodes');
    let roomodesContent = '';
    let configExists = false;
    
    if (fs.existsSync(roomodesPath)) {
      try {
        roomodesContent = fs.readFileSync(roomodesPath, 'utf8');
        console.log(`${colors.fg.green}Found existing .roomodes file${colors.reset}`);
        
        // Check if boomerang mode is already configured
        if (roomodesContent.includes('boomerang')) {
          console.log(`${colors.fg.yellow}Boomerang mode is already configured in .roomodes file${colors.reset}`);
          configExists = true;
        }
      } catch (error) {
        console.log(`${colors.fg.red}Error reading .roomodes file: ${error.message}${colors.reset}`);
      }
    } else {
      console.log(`${colors.fg.yellow}No .roomodes file found. Creating new file.${colors.reset}`);
      roomodesContent = ''; // Start with empty file
    }
    
    if (!configExists) {
      // Boomerang mode configuration
      const boomerangConfig = `
# Boomerang Mode Configuration
[[modes]]
name = "boomerang"
system_prompt = '''
You are an AI assistant designed to identify tasks for future work and create boomerang tasks.
When you identify a task that should be addressed in the future, you should:
1. Clearly describe the task and its importance
2. Suggest a suitable timeframe for addressing it
3. Identify any prerequisites or dependencies
4. Provide any relevant context or resources

Use the <boomerang> tag to create these tasks:
<boomerang>
Task: [Task description]
Timeframe: [Suggested timeframe]
Prerequisites: [Any prerequisites]
Context: [Relevant context]
</boomerang>
'''
model = "claude-3-5-sonnet"
temperature = 0.3
`;
      
      try {
        // Add the boomerang configuration to the file
        if (roomodesContent && !roomodesContent.endsWith('\n\n')) {
          // Make sure there's spacing between existing content and new config
          if (!roomodesContent.endsWith('\n')) {
            roomodesContent += '\n';
          }
          roomodesContent += '\n';
        }
        
        roomodesContent += boomerangConfig;
        fs.writeFileSync(roomodesPath, roomodesContent);
        
        console.log();
        console.log(`${colors.fg.green}Boomerang mode successfully configured!${colors.reset}`);
        console.log(`${colors.fg.cyan}You can now use 'roo boomerang' to create future tasks.${colors.reset}`);
      } catch (error) {
        console.log();
        console.log(`${colors.fg.red}Failed to configure Boomerang mode: ${error.message}${colors.reset}`);
      }
    }
    
    rl.question(`${colors.fg.yellow}Press Enter to return to the main menu...${colors.reset}`, () => {
      showMainMenu();
    });
  });
}

/**
 * Create post-clone hook in package.json to auto-run menu
 */
function createPostCloneHook() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  let packageJson = { scripts: {} };
  
  // Check if package.json exists
  if (fs.existsSync(packageJsonPath)) {
    try {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
    } catch (error) {
      console.error(`Error reading package.json: ${error.message}`);
    }
  }
  
  // Add postclone script
  packageJson.scripts.postclone = "node menu.js";
  packageJson.scripts.menu = "node menu.js";
  
  // Write updated package.json
  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Added postclone hook to package.json');
  } catch (error) {
    console.error(`Error writing package.json: ${error.message}`);
  }
}

// Create post-clone hook
createPostCloneHook();

// Start the menu
showMainMenu();
