/**
 * Workflow Diagram Generator
 * 
 * This script generates Mermaid diagrams for common workflow patterns.
 * It can be used to standardize visual documentation in handoff documents.
 * 
 * Usage: node generate-workflow-diagram.js <diagram-type>
 * Example: node generate-workflow-diagram.js dataFlow > workflow.md
 */

const templates = {
  // Data flow diagram showing how data moves through the system
  dataFlow: `graph LR
    A[Data Source] --> B[Processing]
    B --> C[Storage]
    C --> D[Presentation]`,
  
  // Authentication flow diagram
  authentication: `sequenceDiagram
    Client->>API: Login Request
    API->>AuthService: Validate Credentials
    AuthService->>Database: Check User
    Database-->>AuthService: User Data
    AuthService-->>API: Generate Token
    API-->>Client: Return Token`,
    
  // API request flow
  apiRequest: `sequenceDiagram
    Client->>API Gateway: Request
    API Gateway->>Auth Middleware: Validate Token
    Auth Middleware->>Service: Forward Request
    Service->>Database: Query Data
    Database-->>Service: Return Results
    Service-->>API Gateway: Response
    API Gateway-->>Client: Formatted Response`,
    
  // Event-driven architecture
  eventDriven: `graph LR
    A[Producer] -->|Event| B[Event Bus]
    B -->|Notify| C[Consumer 1]
    B -->|Notify| D[Consumer 2]
    B -->|Notify| E[Consumer 3]`,
    
  // CRUD operations flow
  crudFlow: `graph TD
    A[Client] --> B{API Layer}
    B -->|Create| C[Validation]
    B -->|Read| D[Query Builder]
    B -->|Update| E[Authorization]
    B -->|Delete| F[Soft Delete]
    C --> G[Database]
    D --> G
    E --> G
    F --> G`,
    
  // Error handling flow
  errorHandling: `graph TD
    A[Operation] --> B{Error?}
    B -->|Yes| C[Log Error]
    B -->|No| D[Success Path]
    C --> E{Recoverable?}
    E -->|Yes| F[Retry Logic]
    E -->|No| G[Error Response]
    F --> A
    D --> H[Success Response]`,
    
  // Testing workflow
  testingFlow: `graph TD
    A[Code Change] --> B[Unit Tests]
    B --> C{Pass?}
    C -->|No| A
    C -->|Yes| D[Integration Tests]
    D --> E{Pass?}
    E -->|No| A
    E -->|Yes| F[E2E Tests]
    F --> G{Pass?}
    G -->|No| A
    G -->|Yes| H[Deploy]`,
    
  // CI/CD pipeline
  cicdPipeline: `graph LR
    A[Commit] --> B[Build]
    B --> C[Test]
    C --> D[Analysis]
    D --> E{Quality Gate}
    E -->|Pass| F[Deploy]
    E -->|Fail| G[Notify]
    G --> A`
};

// Get the requested diagram type from command line arguments
const diagramType = process.argv[2];

if (!diagramType) {
  console.error("Please specify a diagram type.");
  console.error(`Available types: ${Object.keys(templates).join(', ')}`);
  process.exit(1);
}

if (templates[diagramType]) {
  // Output the Mermaid diagram
  console.log("```mermaid");
  console.log(templates[diagramType]);
  console.log("```");
} else {
  console.error(`Unknown diagram type: ${diagramType}`);
  console.error(`Available types: ${Object.keys(templates).join(', ')}`);
  process.exit(1);
}
