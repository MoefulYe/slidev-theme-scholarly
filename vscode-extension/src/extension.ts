import * as vscode from 'vscode';
import { LayoutsProvider, ComponentsProvider, TemplatesProvider } from './providers';
import { insertSnippet, createNewPresentation } from './commands';

export function activate(context: vscode.ExtensionContext) {
  console.log('Slidev Scholarly Snippets is now active!');

  // Register Tree View Providers
  const layoutsProvider = new LayoutsProvider();
  const componentsProvider = new ComponentsProvider();
  const templatesProvider = new TemplatesProvider();

  vscode.window.registerTreeDataProvider('scholarly-layouts', layoutsProvider);
  vscode.window.registerTreeDataProvider('scholarly-components', componentsProvider);
  vscode.window.registerTreeDataProvider('scholarly-templates', templatesProvider);

  // Register Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('slidev-scholarly.insertLayout', (item) => {
      insertSnippet(item.snippet);
    }),
    vscode.commands.registerCommand('slidev-scholarly.insertComponent', (item) => {
      insertSnippet(item.snippet);
    }),
    vscode.commands.registerCommand('slidev-scholarly.newPresentation', () => {
      createNewPresentation();
    }),
    vscode.commands.registerCommand('slidev-scholarly.insertCitation', () => {
      insertCitationDialog();
    })
  );
}

async function insertCitationDialog() {
  const citeKey = await vscode.window.showInputBox({
    prompt: 'Enter citation key (e.g., smith2023)',
    placeHolder: 'citekey'
  });

  if (citeKey) {
    const style = await vscode.window.showQuickPick(
      ['Parenthetical @citekey', 'Narrative !@citekey'],
      { placeHolder: 'Select citation style' }
    );

    if (style) {
      const prefix = style.startsWith('Narrative') ? '!@' : '@';
      insertSnippet(`${prefix}${citeKey}`);
    }
  }
}

export function deactivate() {}
