# VS Code MCP Setup Guide

## The Confusion: Two Types of MCP Extensions

### ❌ What You Tried (Won't Work)
- **Extension**: "Model Context Protocol" by Anthropic
- **Type**: MCP Server **Discovery** tool
- **Purpose**: Lists LOCAL stdio MCP servers running on your machine
- **Problem**: Can't add HTTP endpoints directly

### ✅ What You Need (Will Work)
- **Extension**: **Cline** (formerly Claude Dev)
- **Type**: AI coding assistant with MCP support
- **Purpose**: Uses MCP tools while coding
- **Works with**: Our Node.js stdio bridge

---

## Step-by-Step Setup

### 1. Install Cline Extension

1. Press `Ctrl + Shift + X` (Extensions)
2. Search for: **Cline**
3. Install **"Cline"** by Cline
4. Wait for installation to complete

### 2. Configure Cline for MCP

1. Click the **Cline icon** in the left sidebar (appears after install)
2. Click the **gear icon** (⚙️) for settings
3. Scroll to **"MCP Servers"** section
4. Click **"Edit in settings.json"**

### 3. Add PrismMeta MCP Server

Add this to your VS Code `settings.json`:

```json
{
  "cline.mcpServers": {
    "prismmeta": {
      "command": "node",
      "args": [
        "C:\\Users\\ronal\\Downloads\\Mindflow\\mcp-server\\index.js"
      ],
      "env": {
        "MCP_HEAD_URL": "https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app/mcp/jsonrpc"
      }
    }
  }
}
```

### 4. Restart VS Code

- Close and reopen VS Code
- Open Cline panel (left sidebar)
- MCP tools should now be available!

---

## Alternative: Use Continue Extension

If you prefer Continue over Cline:

1. Install **"Continue"** extension
2. Open Continue settings
3. Add to `config.json`:

```json
{
  "mcpServers": [
    {
      "name": "prismmeta",
      "command": "node",
      "args": [
        "C:\\Users\\ronal\\Downloads\\Mindflow\\mcp-server\\index.js"
      ]
    }
  ]
}
```

---

## Testing MCP in VS Code

### With Cline:

1. Open Cline chat
2. Ask: "What MCP tools are available?"
3. Ask: "Search the database for recent users"
4. Cline will show tool usage in the chat

### With Continue:

1. Open Continue chat (Ctrl + L)
2. Type: "@mcp" to see available servers
3. Ask questions that trigger MCP tools
4. Watch for tool invocation messages

---

## Troubleshooting

### "No MCP servers found"
- Verify `index.js` path is correct
- Check Node.js is installed: `node --version`
- Test manually: `npm test` in mcp-server directory

### "Connection timeout"
- Test endpoint: `npm test`
- Check service health:
  ```powershell
  Invoke-RestMethod https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app/health
  ```

### "Tools not appearing"
- Restart VS Code completely
- Check Cline/Continue extension is enabled
- Open extension output panel for errors

---

## Quick Test Commands

### Terminal Test:
```powershell
cd C:\Users\ronal\Downloads\Mindflow\mcp-server
npm test
```

### VS Code Test (in Cline/Continue):
```
What MCP tools do you have access to?
```

Should respond with:
- search_database
- analyze_data
- generate_report

---

## Why This Setup Works

```
VS Code (Cline/Continue)
    ↓ stdio
Node.js Bridge (index.js)
    ↓ HTTPS
Rust MCP Head (Cloud Run)
    ↓
PostgreSQL + Trust Layer
```

The Anthropic MCP extension you found is for **discovering** servers, not using them. Cline/Continue are AI assistants that **consume** MCP tools.

---

## Next Steps

1. ✅ Install Cline or Continue
2. ✅ Add config to settings.json
3. ✅ Restart VS Code
4. ✅ Test with: "What tools are available?"
5. ✅ Use tools: "Search the database for..."

**Ready to code with MCP! 🚀**
