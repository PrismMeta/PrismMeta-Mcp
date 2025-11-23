# How to Use PrismMeta MCP in VS Code

## ✅ Current Status
- MCP server is **working** (3 tools, 1 resource available)
- Globally installed via `npm link`
- Configured in Claude Desktop
- Connected to production Rust MCP head

## ⚠️ Why It's Not Showing in MCP Servers Panel

The **"MCP Servers"** extension panel shows **ACTIVE/RUNNING** servers, not configured ones.

Your server will only appear there when:
1. An AI assistant extension is using it
2. The server process is actively running

Think of it like this:
- **Postman MCP** appears because Postman extension is actively using it
- **Your MCP** needs an AI assistant to consume it

## ✅ How to Actually Use It

### Option 1: With Cline Extension (Recommended)

1. **Install Cline**
   - Press `Ctrl+Shift+X`
   - Search: "Cline"
   - Install "Cline" by Cline

2. **Open Cline Settings**
   - Click Cline icon in sidebar
   - Click gear icon (⚙️)
   - Find "MCP Servers" section

3. **Add This Config**
   ```json
   {
     "cline.mcpServers": {
       "prismmeta": {
         "command": "node",
         "args": ["C:\\Users\\ronal\\Downloads\\Mindflow\\mcp-server\\index.js"]
       }
     }
   }
   ```

4. **Use It**
   - Open Cline chat
   - Ask: "What MCP tools do you have?"
   - Ask: "Search the database for recent users"

### Option 2: With Continue Extension

1. **Install Continue**
   - Extensions → Search "Continue"
   - Install "Continue - Codestral, Claude, and more"

2. **Configure**
   - Open Continue settings
   - Add to config:
   ```json
   {
     "mcpServers": [
       {
         "name": "prismmeta",
         "command": "node",
         "args": ["C:\\Users\\ronal\\Downloads\\Mindflow\\mcp-server\\index.js"]
       }
     ]
   }
   ```

3. **Use It**
   - Press `Ctrl+L` to open Continue
   - Type `@mcp` to see servers
   - Ask questions that use MCP tools

### Option 3: Direct Testing (No AI Assistant)

```powershell
# Terminal test
cd C:\Users\ronal\Downloads\Mindflow\mcp-server
npm test

# Or run it manually
node index.js
# (Then send JSON-RPC requests via stdin)
```

## 🎯 What Each Approach Does

| Method | Shows in MCP Panel? | Can Use Tools? |
|--------|-------------------|---------------|
| Just configured | ❌ No | ❌ No |
| With Cline/Continue | ✅ Yes (when active) | ✅ Yes |
| Claude Desktop | N/A (different app) | ✅ Yes |
| Direct testing | ❌ No | ✅ Yes (manual) |

## 📊 Your MCP Server Info

- **Name**: prismmeta
- **Package**: @prismmeta/mcp-server
- **Location**: `C:\Users\ronal\Downloads\Mindflow\mcp-server`
- **Endpoint**: https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app/mcp/jsonrpc
- **Tools**: 3 (search_database, analyze_data, generate_report)
- **Status**: ✅ Working

## 🚀 Recommended Next Step

**Install Cline** - it's the easiest way to use MCP servers in VS Code:
1. Install Cline extension
2. Add the config above
3. Chat with Cline and use your PrismMeta tools!

Once Cline starts using your MCP server, you'll see "prismmeta" appear in the MCP Servers panel.
