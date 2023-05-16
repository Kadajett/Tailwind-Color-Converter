// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import findNearestColor from "./colorCompare";
import tailwindColors from "./tailwindDefault";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  let disposable = vscode.commands.registerTextEditorCommand(
    "tailwindcolorconvert.convertToTailwind",
    (textEditor) => {
      // findAndParseTailwindConfig().then((colorList) => {
      let selection = textEditor.selection;
      let text = textEditor.document.getText(selection);
      let color = text.trim();

      let tailwindColorDistance = findNearestColor(color, {
        ...tailwindColors,
        // ...colorList,
      });

      if (tailwindColorDistance.distance < 100) {
        let tailwindColor = tailwindColorDistance.color;
        // edit.replace(selection, tailwindColor);
        vscode.window.showInformationMessage(
          'Added "' +
            tailwindColor +
            '" to clipboard for you with a distance of ' +
            tailwindColorDistance.distance +
            " ❤️"
        );
        vscode.env.clipboard.writeText(tailwindColor);
      } else {
        vscode.window.showInformationMessage(
          "No matching Tailwind color found, closest distance was " +
            tailwindColorDistance.distance
        );
      }
      // });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
