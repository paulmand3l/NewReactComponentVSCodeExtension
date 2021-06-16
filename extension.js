const vscode = require('vscode');

const COMMAND_NAME = 'create-react-component.createReactComponent';

function utf8(str) {
    return Buffer.from(str, 'utf8');
}

async function createReactComponent(basePath) {
    const componentName = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "ComponentName",
        validateInput: candidateName => {
            if (!candidateName[0].match(/[a-zA-Z_$]/)) {
                return "Must start with a letter";
            }

            if (candidateName.match(/ /g)) {
                return "Can't include a space";
            }

            if (!candidateName[0].match(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/)) {
                return "Must be a valid js variable name";
            }
        }
    })

    console.log(basePath.toJSON());
    const joinPath = vscode.Uri.joinPath;
    const fs = vscode.workspace.fs;

    if (!componentName) return;
    const componentPath = joinPath(basePath, `/${componentName}`);
    const indexFile = joinPath(componentPath, `/index.js`);
    const mainFile = joinPath(componentPath, `/${componentName}.js`);
    const cssFile = joinPath(componentPath, `/${componentName}.module.css`);

    fs.createDirectory(componentPath);
    fs.writeFile(indexFile, utf8(
`export { default } from './${componentName}.js'
`
    ));

    fs.writeFile(mainFile, utf8(
`import React from 'react'
import styles from './${componentName}.module.css'

class ${componentName} extends React.PureComponent {
  render() {
    return (
      <div className={styles.${componentName}}>
        
      </div>
    )
  }
}

export default ${componentName}
`
    ));

    fs.writeFile(cssFile, utf8(
`.${componentName} {

}
`
    ));

    vscode.window.showInformationMessage(`Created ${componentName} in ${basePath}`);
}

function activate(context) {
    let disposable = vscode.commands.registerCommand(COMMAND_NAME, createReactComponent);
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
