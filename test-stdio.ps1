# Test MCP Server via stdio (like Claude Desktop does)

Write-Host "`n🧪 Testing MCP Server via stdio protocol...`n" -ForegroundColor Cyan

# Start the MCP server as a subprocess
$mcpProcess = Start-Process -FilePath "node" -ArgumentList "index.js" -NoNewWindow -PassThru -RedirectStandardInput "stdin.txt" -RedirectStandardOutput "stdout.txt" -RedirectStandardError "stderr.txt"

Start-Sleep -Seconds 2

# Send a tools/list request via stdin
$request = @{
    jsonrpc = "2.0"
    method = "tools/list"
    params = @{}
    id = 1
} | ConvertTo-Json -Compress

Set-Content -Path "stdin.txt" -Value $request

Start-Sleep -Seconds 3

# Stop the process
Stop-Process -Id $mcpProcess.Id -Force

# Read the output
if (Test-Path "stdout.txt") {
    Write-Host "📥 MCP Server Response:" -ForegroundColor Green
    Get-Content "stdout.txt"
}

if (Test-Path "stderr.txt") {
    Write-Host "`n📝 MCP Server Logs:" -ForegroundColor Yellow
    Get-Content "stderr.txt"
}

# Cleanup
Remove-Item -Path "stdin.txt", "stdout.txt", "stderr.txt" -ErrorAction SilentlyContinue

Write-Host "`n✅ stdio test complete!" -ForegroundColor Green
Write-Host "`nℹ️  This simulates how Claude Desktop will communicate with the MCP server." -ForegroundColor Cyan
