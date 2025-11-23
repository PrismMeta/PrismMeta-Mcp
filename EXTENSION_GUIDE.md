# Publishing PrismMeta MCP as VS Code Extension

## Quick Local Install (Recommended)

Your MCP server is already working! To make it available as an extension:

### Option 1: Manual Setup (Current - Already Working!)
Users can add to their Cline settings:
```json
{
  "cline.mcpServers": {
    "prismmeta": {
      "command": "node",
      "args": ["C:\\path\\to\\mcp-server\\index.js"]
    }
  }
}
```

### Option 2: Package as VSIX (Installable Extension)

1. **Install packaging tool:**
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Create package.json for extension:**
   ```bash
   # Rename current package.json
   mv package.json package-server.json
   # Rename extension-package.json  
   mv extension-package.json package.json
   ```

3. **Package the extension:**
   ```bash
   vsce package
   ```

4. **Install locally:**
   ```bash
   code --install-extension prismmeta-mcp-1.0.0.vsix
   ```

### Option 3: Publish to VS Code Marketplace

1. **Create publisher account:**
   - Go to https://marketplace.visualstudio.com/manage
   - Sign in with Microsoft account
   - Create publisher ID (e.g., "prismmeta")

2. **Get Personal Access Token:**
   - Visit https://dev.azure.com
   - User Settings → Personal Access Tokens
   - Create token with "Marketplace (Publish)" scope

3. **Login and publish:**
   ```bash
   vsce login prismmeta
   vsce publish
   ```

## What Users Get

When installed as extension, users automatically get:
- ✅ PrismMeta MCP server configured in Cline
- ✅ 3 tools: search_database, analyze_data, generate_report
- ✅ Direct connection to production MCP head
- ✅ Full trust layer + security + consent management

## Current Status

✅ **Already Working!** Your MCP server is:
- Configured in Cline
- Connected to production
- Ready to use

The extension packaging is optional - for easier distribution to other users.

## Quick Test

Your server is working now. Just ask Cline:
- "Search the database for recent users"
- "Analyze user engagement data"
- "Generate a financial report"
