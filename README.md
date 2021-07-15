# UI5 task for finding and fixing JavaScript problems using ESLint

![GitHub](https://img.shields.io/github/license/faebulicious/ui5-task-eslint)
![npm](https://img.shields.io/npm/v/ui5-task-eslint)

UI5 task for finding and fixing problems using ESLint in all javascript files of your project

## Install

```bash
npm install ui5-task-eslint --save-dev
```

## Configuration options (in `$yourapp/ui5.yaml`)

- debug: true|false  
  Verbose logging
- autoFix: true|false  
  Enable Auto-fixing

## Usage

1. Define the dependency in `$yourapp/package.json`:

```json
"devDependencies": {
    // ...
    "ui5-task-eslint": "*"
    // ...
},
"ui5": {
  "dependencies": [
    // ...
    "ui5-task-eslint",
    // ...
  ]
}
```

> As the devDependencies are not recognized by the UI5 tooling, they need to be listed in the `ui5 > dependencies` array.

2. configure it in `$yourapp/ui5.yaml`:

```yaml
builder:
  customTasks:
    - name: ui5-task-eslint
      afterTask: replaceVersion
      configuration:
        debug: false
        autoFix: true
```

## How it works

The task runs ESLint for all your javascript files based on your ESLint configuration.

Auto-fixing of problems is **not** enabled by default.

```bash
WARN builder:custom:eslint 🧹 ESLint check passed with warnings (1): BaseController.js
ERR! builder:custom:eslint 🧹 ESLint check failed (2): Overview.controller.js
ERR! builder:custom:eslint 🧹 ESLint check failed with 2 Errors and 1 Warnings
```

## License

This work is licensed under the [MIT License](./LICENSE).
