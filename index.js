#!/usr/bin/env node
/**
 * PrismMeta MCP Server - stdio bridge to deployed Rust MCP head
 * Connects Claude Desktop and VS Code to the production MCP service
 */

import fetch from 'node-fetch';
import { createInterface } from 'readline';

const MCP_HEAD_URL = process.env.MCP_HEAD_URL || 'https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app/mcp/jsonrpc';

// MCP Server state
let initialized = false;
const serverInfo = {
  name: 'prismmeta',
  version: '1.0.0'
};

// Read from stdin, write to stdout (MCP stdio protocol)
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Log to stderr (won't interfere with stdio)
function log(message) {
  console.error(`[MCP Server] ${message}`);
}

// Send JSON-RPC request to deployed MCP head
async function sendToMCPHead(request) {
  try {
    log(`Forwarding to MCP head: ${request.method}`);
    
    const response = await fetch(MCP_HEAD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    log(`Received response for: ${request.method}`);
    
    // Ensure proper JSON-RPC format
    if (!result.jsonrpc) {
      result.jsonrpc = '2.0';
    }
    
    // Ensure id is present if request had one
    if (request.id !== undefined && result.id === undefined) {
      result.id = request.id;
    }
    
    // If result has error, ensure it's properly formatted
    if (result.error && !result.result) {
      return {
        jsonrpc: '2.0',
        id: request.id !== undefined ? request.id : null,
        error: {
          code: result.error.code || -32603,
          message: result.error.message || 'Internal error',
          data: result.error.data
        }
      };
    }
    
    // If result has a result field, ensure proper format
    if (result.result !== undefined) {
      return {
        jsonrpc: '2.0',
        id: request.id !== undefined ? request.id : null,
        result: result.result
      };
    }
    
    return result;
    
  } catch (error) {
    log(`Error: ${error.message}`);
    return {
      jsonrpc: '2.0',
      id: request.id !== undefined ? request.id : null,
      error: {
        code: -32603,
        message: error.message
      }
    };
  }
}

// Handle MCP protocol methods locally
function handleLocalMethod(request) {
  const { method, id } = request;
  
  // Handle initialize
  if (method === 'initialize') {
    initialized = true;
    log('MCP initialized');
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        serverInfo,
        capabilities: {
          tools: {},
          resources: {}
        }
      }
    };
  }
  
  // Handle notifications/initialized notification (no response!)
  if (method === 'notifications/initialized') {
    log('MCP initialization notification received');
    return null; // Don't send any response for notifications
  }
  
  // Handle resources/templates/list - return empty list
  if (method === 'resources/templates/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        resourceTemplates: []
      }
    };
  }
  
  // Handle ping
  if (method === 'ping') {
    return {
      jsonrpc: '2.0',
      id,
      result: {}
    };
  }
  
  return null; // Not a local method, forward to MCP head
}

// Handle incoming JSON-RPC messages from Claude/VS Code
rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);
    log(`Received: ${request.method} (id: ${request.id})`);
    
    // Try to handle locally first
    const localResponse = handleLocalMethod(request);
    if (localResponse !== null) {
      log(`Local response: ${JSON.stringify(localResponse)}`);
      console.log(JSON.stringify(localResponse));
      return;
    }
    
    // If it returned null, it's a notification - don't send response
    if (localResponse === null && !request.id) {
      log('Notification handled, no response needed');
      return;
    }
    
    // Forward to MCP head
    const response = await sendToMCPHead(request);
    
    // Send response back via stdout
    log(`Sending response: ${JSON.stringify(response)}`);
    console.log(JSON.stringify(response));
    
  } catch (error) {
    log(`Parse error: ${error.message}`);
    console.log(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: 'Parse error',
        data: error.message
      }
    }));
  }
});

rl.on('close', () => {
  log('Connection closed');
  process.exit(0);
});

// Handle process signals
process.on('SIGINT', () => {
  log('Received SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Received SIGTERM');
  process.exit(0);
});

log('PrismMeta MCP Server started');
log(`Connected to: ${MCP_HEAD_URL}`);
