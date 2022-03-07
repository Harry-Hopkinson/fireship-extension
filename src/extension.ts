import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	const commandName = "fireship-extension.fireship-extension";

	var command = vscode.commands.registerCommand(commandName, () => {
		// check for highlighted text
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return vscode.window.showErrorMessage("No editor is active");
		}
		const selection = editor.selection;
		if (selection.isEmpty) {
			return vscode.window.showErrorMessage("No text selected");
		} else {
			// select all text
			editor.selections = [
				new vscode.Selection(
					0,
					0,
					selection.end.line,
					selection.end.character
				),
			];
			// save the text to the clipboard but reverse it
			// e.g the last line becomes the first line
			const text = editor.document.getText(editor.selection);
			vscode.env.clipboard.writeText(
				text.split("\n").reverse().join("\n")
			);
			// remove the original text
			editor.edit((editBuilder) => {
				editBuilder.delete(selection);
			});
		}
	});

	context.subscriptions.push(command);
}
