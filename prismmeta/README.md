# PrismMeta MCP Server

Connect your VS Code to the PrismMeta production MCP (Model Context Protocol) server to access AI-powered development tools with enterprise-grade trust layer and security.

## Features

- 🔍 **search_database** - Search production database with natural language queries
- 📊 **analyze_data** - Perform data analysis with summarize/aggregate/filter operations
- 📝 **generate_report** - Generate financial, operational, or security reports
- 🔒 **Trust Layer** - DID-based identity with W3C verifiable credentials
- 🛡️ **Security** - RBAC, consent management, and audit logging
- ☁️ **Cloud-Native** - Deployed on Google Cloud Run with auto-scaling

## Requirements

- VS Code 1.80.0 or higher
- **Cline extension** - Install from VS Code marketplace for AI assistance
- Node.js (automatically uses built-in MCP bridge)

## Quick Start

1. Install this extension
2. Install **Cline** extension (AI assistant)
3. Restart VS Code
4. Open Cline and ask: "What MCP tools do you have?"

The extension automatically configures Cline to use PrismMeta MCP tools!

## Usage

Once installed, you can use these tools through Cline:

### Search Database
```
Ask Cline: "Search the database for users created this week"
```

### Analyze Data
```
Ask Cline: "Analyze user engagement data and summarize trends"
```

### Generate Reports
```
Ask Cline: "Generate a financial report in markdown format"
```

## Extension Settings

This extension contributes the following settings:

* `prismmeta.mcpHeadUrl`: Production MCP endpoint URL
* `prismmeta.autoConfigureCline`: Automatically configure Cline (enabled by default)

## Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_database` | Natural language database search | query (required), limit (optional) |
| `analyze_data` | Dataset analysis | dataset (required), operation (required) |
| `generate_report` | Report generation | report_type (required), format (optional) |

## Security Features

✅ DID-based identity (W3C standard)  
✅ Ed25519 cryptographic signatures  
✅ Verifiable credentials  
✅ Role-based access control (RBAC)  
✅ Consent management  
✅ Audit logging  
✅ SSL/TLS encryption  

## Release Notes

### 1.0.0

Initial release of PrismMeta MCP Server extension with:
- Automatic Cline configuration
- 3 production-ready MCP tools
- Enterprise security and trust layer
- Cloud-native architecture

---

**Made with ❤️ by PrismMeta**
