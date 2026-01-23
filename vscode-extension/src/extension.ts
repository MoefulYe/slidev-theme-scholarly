import * as vscode from 'vscode';
import { LayoutsProvider, ComponentsProvider, TemplatesProvider, ThemesProvider } from './providers';
import { insertSnippet, createNewPresentation, setColorTheme, setFontTheme, setColorMode, applyThemePreset } from './commands';
import { BibCompletionProvider, BibHoverProvider, BibTreeProvider } from './bibtex';
import { registerPreviewCommand, registerPreviewView } from './preview';

export function activate(context: vscode.ExtensionContext) {
  console.log('Slidev Scholarly Snippets is now active!');

  const output = vscode.window.createOutputChannel('Slidev Scholarly');
  context.subscriptions.push(output);

  const registerTree = <T>(viewId: string, provider: vscode.TreeDataProvider<T>) => {
    try {
      context.subscriptions.push(vscode.window.registerTreeDataProvider(viewId, provider));
      output.appendLine(`Registered tree view: ${viewId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      output.appendLine(`Failed to register tree view "${viewId}": ${message}`);
      vscode.window.showErrorMessage(
        `Slidev Scholarly: view "${viewId}" not found. Please reinstall the VSIX and reload VS Code.`
      );
    }
  };

  // Register Tree View Providers
  const layoutsProvider = new LayoutsProvider(context.extensionUri);
  const componentsProvider = new ComponentsProvider(context.extensionUri);
  const templatesProvider = new TemplatesProvider();
  const themesProvider = new ThemesProvider(context.extensionUri);
  const bibTreeProvider = new BibTreeProvider();

  registerTree('scholarly-layouts', layoutsProvider);
  registerTree('scholarly-components', componentsProvider);
  registerTree('scholarly-templates', templatesProvider);
  registerTree('scholarly-themes', themesProvider);
  registerTree('scholarly-references', bibTreeProvider);

  const bibWatcher = vscode.workspace.createFileSystemWatcher('**/*.bib');
  context.subscriptions.push(
    bibWatcher,
    bibWatcher.onDidCreate(() => bibTreeProvider.refresh()),
    bibWatcher.onDidChange(() => bibTreeProvider.refresh()),
    bibWatcher.onDidDelete(() => bibTreeProvider.refresh())
  );

  // Register BibTeX completion and hover providers
  const mdSelector: vscode.DocumentSelector = { language: 'markdown', scheme: 'file' };

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      mdSelector,
      new BibCompletionProvider(),
      '@' // Trigger on @
    )
  );

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      mdSelector,
      new BibHoverProvider()
    )
  );

  // Register Preview Command
  context.subscriptions.push(registerPreviewView(context));
  context.subscriptions.push(registerPreviewCommand(context));

  // Register Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('slidev-scholarly.insertLayout', (item) => {
      insertSnippet(item.snippet);
    }),
    vscode.commands.registerCommand('slidev-scholarly.insertComponent', (item) => {
      insertSnippet(item.snippet);
    }),
    vscode.commands.registerCommand('slidev-scholarly.newPresentation', (template?: string) =>
      createNewPresentation(template)
    ),
    vscode.commands.registerCommand('slidev-scholarly.insertCitation', () =>
      insertCitationDialog()
    ),
    vscode.commands.registerCommand('slidev-scholarly.insertBibKey', (key: string) => {
      insertSnippet(`@${key}`);
    }),
    vscode.commands.registerCommand('slidev-scholarly.setColorTheme', (value?: string) =>
      setColorTheme(value)
    ),
    vscode.commands.registerCommand('slidev-scholarly.setFontTheme', (value?: string) =>
      setFontTheme(value)
    ),
    vscode.commands.registerCommand('slidev-scholarly.setColorMode', (value?: 'light' | 'dark') =>
      setColorMode(value)
    ),
    vscode.commands.registerCommand('slidev-scholarly.applyThemePreset', (preset?: any) =>
      applyThemePreset(preset)
    ),
    vscode.commands.registerCommand('slidev-scholarly.refreshReferences', () => {
      bibTreeProvider.refresh();
      vscode.window.showInformationMessage('References refreshed');
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

export function deactivate() { }
