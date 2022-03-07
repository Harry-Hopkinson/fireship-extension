import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	const commandName = "fireship-extension.fireship-extension";

	var command = vscode.commands.registerCommand(commandName, () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return vscode.window.showErrorMessage("No editor is active");
		}
		const selection = editor.selection;
		vscode.window
			.showInputBox({
				placeHolder: "Enter the line numbers to remove text from",
				prompt: "Enter the line numbers to remove text from",
				value: selection.start.line + 1 + "-" + selection.end.line,
			})
			.then((value) => {
				if (value) {
					const lines = value.split("-");
					const start = parseInt(lines[0]);
					const end = parseInt(lines[1]);
					if (lines.length !== 2 || start > end) {
						return vscode.window.showErrorMessage(
							"Invalid line range"
						);
					}
					const text = editor.document.getText(
						new vscode.Range(
							new vscode.Position(start, 0),
							new vscode.Position(end, 0)
						)
					);
					vscode.env.clipboard.writeText(text);
					editor.edit((editBuilder) => {
						editBuilder.delete(
							new vscode.Range(
								new vscode.Position(start, 0),
								new vscode.Position(end, 0)
							)
						);
					});
					vscode.window.showInformationMessage("Debugging!");
				} else {
					vscode.window.showErrorMessage("No text entered");
				}
			});
	});

	context.subscriptions.push(command);
}
