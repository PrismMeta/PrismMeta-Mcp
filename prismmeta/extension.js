// @ts-check
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('PrismMeta MCP extension is now active!');

    // Auto-configure Cline on startup
    const config = vscode.workspace.getConfiguration('prismmeta');
    const autoConfig = config.get('autoConfigureCline', true);
    
    if (autoConfig) {
        configureClineMCP(context);
    }

    // Show welcome message
    vscode.window.showInformationMessage(
        '🎉 PrismMeta MCP Server ready! Use with Cline to access search_database, analyze_data, and generate_report tools.'
    );
}

/**
 * Configure MCP server in Cline settings
 * @param {vscode.ExtensionContext} context
 */
function configureClineMCP(context) {
    const config = vscode.workspace.getConfiguration('prismmeta');
    const mcpHeadUrl = config.get('mcpHeadUrl');
    
    // Path to Cline MCP settings
    const clineSettingsPath = path.join(
        process.env.APPDATA || '',
        'Code',
        'User',
        'globalStorage',
        'saoudrizwan.claude-dev',
        'settings',
        'cline_mcp_settings.json'
    );

    try {
        // Read or create Cline settings
        let clineSettings = { mcpServers: {} };
        
        if (fs.existsSync(clineSettingsPath)) {
            const content = fs.readFileSync(clineSettingsPath, 'utf8');
            clineSettings = JSON.parse(content);
        } else {
            // Create directory if it doesn't exist
            const dir = path.dirname(clineSettingsPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }

        // Add PrismMeta MCP server
        const mcpServerPath = path.join(context.extensionPath, 'mcp-server.js');
        
        clineSettings.mcpServers = clineSettings.mcpServers || {};
        clineSettings.mcpServers.prismmeta = {
            command: 'node',
            args: [mcpServerPath],
            env: {
                MCP_HEAD_URL: mcpHeadUrl
            }
        };

        // Write back to file
        fs.writeFileSync(clineSettingsPath, JSON.stringify(clineSettings, null, 2));
        
        console.log('✅ PrismMeta MCP configured in Cline');
    } catch (error) {
        console.error('Failed to configure Cline:', error);
        vscode.window.showWarningMessage(
            'Could not auto-configure Cline. Please configure manually in Cline settings.'
        );
    }
}

function deactivate() {
    console.log('PrismMeta MCP extension deactivated');
}

module.exports = {
    activate,
    deactivate
};
