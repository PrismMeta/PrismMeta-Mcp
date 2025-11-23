# 🎯 Quick Start: Using PrismMeta MCP in Claude Desktop

## Setup (One-Time)

1. **Verify Node.js is installed**
   ```powershell
   node --version  # Should be v14 or higher
   ```

2. **Config file already created at:**
   ```
   C:\Users\ronal\AppData\Roaming\Claude\claude_desktop_config.json
   ```

3. **Restart Claude Desktop** (fully quit and reopen)

## Using MCP Tools in Claude

### Example Prompts

#### 🔍 Search Database
```
Can you search the database for users who signed up in the last week?
```

#### 📊 Analyze Data  
```
Analyze the user engagement data and show me the trends
```

#### 📝 Generate Report
```
Generate a report on system performance metrics
```

### How to Know MCP is Working

Look for these indicators in Claude Desktop:

1. **Tool icon** (🔨) appears when Claude can use tools
2. **"Using tool"** message shows which MCP tool is being invoked
3. **Tool results** are displayed in the chat

## Testing Without Claude

### Quick Test (HTTP)
```powershell
cd C:\Users\ronal\Downloads\Mindflow\mcp-server
npm test
```

### Full Service Test
```powershell
cd C:\Users\ronal\Downloads\Mindflow\rust-services\mcp-head
.\TEST_REAL_MCP_WORKFLOW.ps1
```

## Available Tools

| Tool | Description | Example Use |
|------|-------------|-------------|
| `search_database` | Search production DB with natural language | "Find all active users" |
| `analyze_data` | Run analysis on datasets | "Analyze user retention" |
| `generate_report` | Create formatted reports | "Generate monthly summary" |

## Architecture Flow

```
You type in Claude
    ↓
Claude decides to use MCP tool
    ↓
Claude sends JSON-RPC via stdio
    ↓
Node.js bridge forwards to Cloud Run
    ↓
Rust MCP Head processes request
    ↓
Returns results to Claude
    ↓
Claude shows you the answer
```

## Troubleshooting

### MCP tools not showing?
```powershell
# 1. Check config exists
Get-Content $env:APPDATA\Claude\claude_desktop_config.json

# 2. Test MCP connection
cd C:\Users\ronal\Downloads\Mindflow\mcp-server
npm test

# 3. Restart Claude Desktop completely
```

### Connection timeout?
```powershell
# Check if MCP head is healthy
Invoke-RestMethod https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app/health
```

### Want to see logs?
```powershell
# MCP server logs (stderr)
node index.js 2> mcp-debug.log

# Cloud Run logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=prismmeta-mcp-head" --limit 20
```

## Advanced: Custom MCP Session

If you want to use a specific session ID:

```powershell
# Set environment variable before starting Claude
$env:MCP_SESSION_ID = "your-session-id-here"
```

## Security Notes

- ✅ All traffic uses HTTPS (TLS 1.3)
- ✅ Trust layer verifies credentials
- ✅ RBAC enforces access control
- ✅ Consent management for data access
- ✅ Audit logging enabled

## Production URLs

- **MCP Head**: https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app
- **Backend**: https://prismmeta-mcp-backend-720635444629.us-central1.run.app
- **Health Check**: https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app/health

---

**Ready to use! Just restart Claude Desktop and start chatting! 🚀**
