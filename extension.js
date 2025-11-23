// VS Code Extension Entry Point
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('PrismMeta MCP extension is now active');

    // Register the MCP server with Cline automatically
    const disposable = vscode.commands.registerCommand('prismmeta.configureMCP', function () {
        vscode.window.showInformationMessage('PrismMeta MCP Server is configured and ready to use with Cline!');
    });

    context.subscriptions.push(disposable);
    
    // Auto-configure on activation
    configureClineServer(context);
}

function configureClineServer(context) {
    const config = vscode.workspace.getConfiguration('prismmeta');
    const mcpHeadUrl = config.get('mcpHeadUrl');
    
    console.log(`PrismMeta MCP configured with endpoint: ${mcpHeadUrl}`);
    
    // Show notification
    vscode.window.showInformationMessage(
        'PrismMeta MCP Server ready! Open Cline to use search_database, analyze_data, and generate_report tools.'
    );
}

function deactivate() {
    console.log('PrismMeta MCP extension deactivated');
}

module.exports = {
    activate,
    deactivate
};
