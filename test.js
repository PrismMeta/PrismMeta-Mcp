#!/usr/bin/env node
/**
 * Test script for PrismMeta MCP Server
 * Tests connection to deployed MCP head
 */

import fetch from 'node-fetch';

const MCP_HEAD_URL = 'https://prismmeta-mcp-head-xnnblyviqq-uc.a.run.app/mcp/jsonrpc';

async function testMCPConnection() {
  console.log('🧪 Testing MCP Connection...\n');
  console.log(`URL: ${MCP_HEAD_URL}\n`);

  // Test 1: tools/list
  console.log('Test 1: List available tools');
  try {
    const response = await fetch(MCP_HEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: 1
      })
    });

    const result = await response.json();
    console.log('✅ tools/list succeeded');
    console.log(`   Available tools: ${result.result?.tools?.length || 0}`);
    if (result.result?.tools) {
      result.result.tools.forEach(tool => {
        console.log(`   - ${tool.name}: ${tool.description}`);
      });
    }
  } catch (error) {
    console.error('❌ tools/list failed:', error.message);
  }

  console.log('\n');

  // Test 2: resources/list
  console.log('Test 2: List available resources');
  try {
    const response = await fetch(MCP_HEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'resources/list',
        params: {},
        id: 2
      })
    });

    const result = await response.json();
    console.log('✅ resources/list succeeded');
    console.log(`   Available resources: ${result.result?.resources?.length || 0}`);
    if (result.result?.resources) {
      result.result.resources.forEach(resource => {
        console.log(`   - ${resource.name}: ${resource.description}`);
      });
    }
  } catch (error) {
    console.error('❌ resources/list failed:', error.message);
  }

  console.log('\n✨ MCP connection test complete!\n');
}

testMCPConnection();
