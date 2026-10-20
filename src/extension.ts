import * as vscode from 'vscode';

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

class CyberpunkPetViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'cyberpunkPet.view';
  private view?: vscode.WebviewView;

  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    this.view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')],
    };
    webviewView.webview.html = this.getHtml(webviewView.webview);
  }

  public postSpeedDelta(delta: number): void {
    this.view?.webview.postMessage({ type: 'speed', delta });
  }

  private getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'main.js'));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'style.css'));
    const imgUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'portrait.jpg'));
    const nonce = getNonce();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
  <link href="${styleUri}" rel="stylesheet" />
  <title>cybr_gurl</title>
</head>
<body>
  <div id="stage">
    <img id="portrait" src="${imgUri}" alt="cybr_gurl" />
    <div id="scanlines"></div>
    <div id="sweep"></div>
    <div id="flash"></div>
    <div id="error">
      <div id="error-title">ERROR</div>
      <div id="error-sub">connection_lost :: retry()</div>
    </div>
    <div id="vignette"></div>
  </div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }
}

export function activate(context: vscode.ExtensionContext): void {
  const provider = new CyberpunkPetViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(CyberpunkPetViewProvider.viewType, provider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('cyberpunkPet.speedUp', () => provider.postSpeedDelta(-80))
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('cyberpunkPet.slowDown', () => provider.postSpeedDelta(80))
  );
}

export function deactivate(): void {}
