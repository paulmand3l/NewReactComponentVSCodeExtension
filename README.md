# New React Component

This extension adds a new item (named "New React Component") to the Explorer context menu when right-clicking on a folder.

When selected, this new menu item will prompt you for a name for your component, then create several files within the folder you right-clicked on:

- `/ComponentName`
- `/ComponentName/index.js`
- `/ComponentName/ComponentName.js`
- `/ComponentName/ComponentName.module.css`

These files contain a class-based React component (extending from PureComponent) set up with css modules.
