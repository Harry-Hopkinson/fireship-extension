import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
	const commandName = "fireship-extension.fireship-extension";

	var command = vscode.commands.registerCommand(commandName, () => {
		vscode.window.showInformationMessage("Hello World!");
	});

	context.subscriptions.push(command);
}

export function deactivate() {}
