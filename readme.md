# Creating the Skeleton

`npx extSkeleton`

## Modifying the skeleton

### Install node modules and build the extension

- terminal ->  `npm i`
- terminal ->  `npm run build:extension`
- Go To Chrome -> Manage Extensions -> Toggle Developer Mode -> Load Unpacked -> Select the `dist` folder

### manifest.json

- Change name
- Change Version
- Add your icon in the manifest

```json
// ./public/manifest.json
...
"name": "<YOUR_EXTENSION_NAME>",
"version": "<YOUR_VERSION> usually you start from 0.0.1",
"description": "<DESCRIBE_YOUR_EXTENSION>",
...
```

### Remove the tutorial page (if you need to keep the new tab page just modify)

- Remove the components `./src/tutorialMain.tsx` and `./src/components/tutorialPage` folder
- Remove the example component of the popup `./src/popup/components/ComponentExample.tsx`
- Update the `./vite.config.ts` build

```typescript
...
input: {
    main: 'index.html',
    // <tutorial: 'tutorial-page.html'> (remove this)
},
...
```

Or modify it if you would want to use this page as your new tab page.

### Define the different components of your extension from the examples

- Background script
- Content script
- Popup
- Context menu
- Storage
- Ports
- Inject script
- Inject function

You can add or remove components as you please in order to define your strategy for the extension.

Because of modularity, you can just remove a specific module and it will not affect the rest of the extension.
