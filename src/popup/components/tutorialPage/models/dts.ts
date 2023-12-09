import { IExtensionComponents } from "./interfaces";

export const extensionComponents: IExtensionComponents = {
    "Manifest":{
        name:"Manifest",
        description:"This it the extansion configuration docs, in the manifest you can set various options for your extension.",
        link:"https://developer.chrome.com/docs/extensions/reference/manifest",
        layoutOfPage:`
        <p> Your Manifest is positioned in your public folder 'public/manifest.json' </p>
        <p> The manifest is the central feature of your extansion, it is where you can set various options for your extansion. </p>
        <P> To set up your name update this line <pre><code>"name": "thisExtension",</code></pre> </p>
        <pre>
        <code>
        {
            "manifest_version": 3,
            "name": "thisExtension",
            "version": "0.0.1",
            "description": "use this blueprint to create a new extension",
            "permissions": [
              "activeTab",
              "clipboardRead",
              "clipboardWrite",
              "scripting",
              "storage",
              "contextMenus",
              "debugger",
              "tabs",
              "webRequest",
              "nativeMessaging", 
              "tabs"
            ],
            "background": {
              "service_worker": "background.js"
            },
            "action": {
                "default_popup": "index.html"
            },
            "host_permissions": ["*://*/*"],
            "content_scripts": [
              {
                "matches": ["<all_urls>"],
                "js": ["content.js"],
                "run_at": "document_end"
              }
            ],
            "web_accessible_resources": [
              {
                "resources": ["injected/exampleScript.js"],
                "matches": ["<all_urls>"]
              }
            ]
        }
        </code>
        </pre>
        <p>here you can change your configuration, add additional scripts and more.</p>
        <h2> Exmaple: adding a icon to your extension </h2>
        <p> To add a icon to your extension you need to add the following code to your manifest.json </p>
        <pre>
        <code>
        {
            ...
            "action": {
                "default_popup": "index.html",
                "default_icon": {
                    "16": "images/get_started16.png",
                    "32": "images/get_started32.png",
                    "48": "images/get_started48.png",
                    "128": "images/get_started128.png"
                }
            },
            ...
        }
        </code>
        </pre>    
        `
    },
    "ContentScript":{
        name: "Content Script",
        description: "Content scripts are files that run in the context of web pages. By using the standard Document Object Model (DOM), they can read details of the web pages the browser visits, or make changes to them.",
        link:"https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts",
        layoutOfPage:
        `
        <p> the content script positioned under the src/content folder </p>
        <p> the content script handles the interaction with the web page, it can be used to inject scripts into the page, listen to events and more. </p>
        <p> in the current context the rollup (rollup.config.js) handles the parsing of the content script with all the modules it uses into a singular js in the build folder (./dist) </p> 
        <p> the content script is injected into the page via the manifest.json </p>
        <pre>
        <code>
        {
            "content_scripts": [
              {
                "matches": ["<all_urls>"],
                "js": ["content.js"],
                "run_at": "document_end"
              }
            ],
        }
        <p> I found it best to use a modular approach in the content script in order to keep the code clean and easy to maintain. </p>
        <h2> Example: Send message to popup</h2>
        <p> invoking the {contentScriptMessenger.sendMessageToPopup} function will send a message to the popup script </p>
        <pre>
        <code>
        import contentScriptMessenger from "./ContentScriptMessenger";
        import { portMessages } from "../../constants/enums";
        ...
        contentScriptMessenger.sendMessageToPopup({ type: portMessages.GREETING, payload: "Hello from the content script" });
        </code>
        </pre>

        `
    },
    "BackgroundScript":{
        name: "Background Script",
        description: "An event page is loaded only when it is needed, and unloaded when it goes idle. Event pages are more efficient than using persistent background pages for most tasks.",
        link:"https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle",
        layoutOfPage:
        `
        <p> the background script positioned under the src/background folder </p>
        <p> the background script handles the interaction with the extansion, it can be used to listen to events, send messages to the popup and more. </p>
        <p> In addition it can be used hadling claculations in an async way, not blocking the extension</p>
        <p> in the current context the rollup (rollup.config.js) handles the parsing of the background script with all the modules it uses into a singular js in the build folder (./dist) </p>
        <p> the background script is injected into the page via the manifest.json </p>
        <pre>
        <code>
        {
            "background": {
              "service_worker": "background.js"
            },
        }
        </code>
        </pre>

        <p> I found it best to use a modular approach in the background script in order to keep the code clean and easy to maintain. </p>
        <p> One thing to note is that the background script is a service worker, and as such it has a life cycle, it can be found in the link above. </p>
        <p> Moreoever, the background script is a singleton, meaning that it is only loaded once, and it is shared between all the tabs, in a closed enviourment </p>
        <p> Background script is also handles the context menu, which can be found in the ./src/background/modules/contextMenuMain.ts file </p>

        <h2>Example: Send message to content script</h2>
        <p> creating a new file backgroundMessenger.ts </p>
        <pre>
        <code>
        //./src/background/modules/backgroundMessenger.ts
        export function sendMessageToContent(message: MessageTypes) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id!, message);
                }
            });
        }
        </code>
        </pre>
        <p> invoking the {sendMessageToContent} function will send a message to the content script </p>
        <pre>
        <code>
        import backgroundMessenger from "./BackgroundMessenger";
        import { portMessages } from "../../constants/enums";
        ...
        backgroundMessenger.sendMessageToContent({ type: portMessages.INJECTEXAMPLE });
        </code>
        </pre>
        
        `
    },
    "Popup":{
        name: "Popup",
        description: "A browser action with a popup dump. The popup dump will be shown when the user clicks on the browser action icon.",
        link:"https://developer.chrome.com/docs/extensions/reference/api/action",
        layoutOfPage:
        `
        <p> the popup positioned under the src folder and is considered the react application which was created via vite </p>
        <p> In this structure we are builing via react the "website" which is your popup window </p>
        <p> This structure is very similar to a regular react application, with the exception that we are using the chrome api to send and receive messages from the background script </p>
        <p> and it emphasizes the use of popup as a full react application </p>
        <p> the popup is injected into the page via the manifest.json </p>
        <pre>
        <code>
        {
            "action": {
                "default_popup": "index.html"
            },
        }
        </code>
        </pre>
        <p> while this may be not the best approach it is intuitive and easy to understand from a react developer perspective </p>
        <p> In addition there is an additional html file which is holding the tutorial you are currently reading </p>
        <p> this strucutre is using a modified vite.config.ts in order to address both html files in their own contexts </p>
        <P> You can add or remove components as you please in order to define you strategy for the extension </p>
        `
    },
    "Ports":{
        name: "Ports and messaging",
        description: "Ports are a low-level mechanism for sending data between the extension and one or more views (tabs, popups, etc.).",
        link:"https://developer.chrome.com/docs/extensions/develop/concepts/messaging",
        layoutOfPage:
        `
        <p> Port examples can be found in: </p>
        <p> <b>./src/background/modules/portHandler.ts</b> </p>
        <p> <b>./src/content/modules/contentScriptMessenger.ts</b> </p>
        <p> <b>./src/popup/services/BackgroundPortService.ts</b> </p>
        <p> <b>./src/popup/services/ContentMessageService.ts</b> </p>
        `
    },
    "Storage":{
        name: "Storage",
        description: "Chrome provides several storage areas, which you can categorize as follows:",
        link:"https://developer.chrome.com/docs/extensions/reference/api/storage",
        layoutOfPage:
        `
        <p> Examples can be found in: <p>
        <p> <b>./src/background/modules/storage.ts</b> </p>
        <p> <b>./src/popup/services/storageService.ts</b> </p>
        `
    },
    "InjectFunction":{
        name: "Inject Function",
        description: "Inject a function into the page via the background script.",
        link:"https://developer.chrome.com/docs/extensions/reference/api/scripting",
        layoutOfPage:
        `
        <p> Inject function is handled by the chrome scripting API and is injected via the background script </p>
        <p> This is a very powerful tool which can be used to inject functions into the page, and invoke them from the background script </p>
        <p> Example for this can be found in the <b>./src/background/modules/injector.ts</b> file </p>
        `
    },
    "InjectScript":{
        name: "Inject Script",
        description: "Inject a script into the page via the content script.",
        link:"https://developer.chrome.com/docs/extensions/reference/api/runtime",
        layoutOfPage:
        `
        <p> This example is using the chrome runtime API in order to inject a script into the page via the content script </p>
        <p> Example for this can be found in the <b>./src/content/modules/ScriptInjector.ts</b> file </p>
        <p> This can be used to inject a script into the page, and invoke them from the content script </p>
        <p> in this case we are building a script from the ./src/injected which is built by rollup.config.js into a js file in the ./dist folder</p>
        <p> which is later injected into the page via the content script </p>
        
        `
    },
    "contextMenus":{
        name: "Options",
        description: "Add options to the context menu which can be opened by pressing the right click.",
        link:"https://developer.chrome.com/docs/extensions/reference/api/contextMenus",
        layoutOfPage:
        `
        <p> This example is using the chrome contextMenus API in order to add options to the context menu </p>
        <p> Example for this can be found in the <b>./src/background/modules/contextMenuMain.ts</b> file </p>
        <p> This can be used to add options to the context menu, and invoke them from the background script </p>
        <p> in this case we are adding a option to the context menu which will store a message in the storage API and on opening the popoup will display it in the "Answer from the Context Menu:" line </p>
        `
    },
    "SetUp":{
        name: "How To Set Up Your Extension",
        description: "",
        flag: true,
        layoutOfPage:
        `
        <p> To modify this skeleton follow these steps </p>
        <h3> Install node modules and build the extension </h3>
        <ul>
        <li>terminal ->  npm i</li>
        <li>terminal ->  npm run build:extension</li>
        <li> Go To Chome -> Manage Extensions -> Toggle Developer Mode -> Load Unpacked -> Select the dist folder </li>
        </ul>
        <h3> manifest.json </h3>
        <ul>
        <li>Change name</li>
        <li>Change Version </li>
        <li>Add your icon in the manifest</li>
        </ul>
        <pre>
        <code>
        // ./public/manifest.json
        ...
        "name": <YOUR_EXTENSION_NAME>,
        "version": <YOUR_VERSION> usually you start from 0.0.1,
        "description": <DESCRIBE_YOUR_EXTENSION>,
        ...
        </code>
        </pre>

        <h3>Remove the tutorial page (if you need to keep the new tab page just modify)</h3>
        <ul> 
        <li>Remoe the components <b>./src/tutorialMain.tsx and ./src/components/tutorialPage folder</b></li>
        <li> remove the example component of the popup <b>./src/popup/components/ComponentExample.tsx</b> </li>
        <li> 
        update the <b>./vite.config.ts</b> build 
        <pre>
        <code>
            ...
            input: {
                main: 'index.html',
                <b>tutorial: 'tutorial-page.html'</b>(remove this)
            },
            ...
        </code>
        </pre>
        or modify it if you would want to use this page as your new tab page
        </li>
        </ul>
        <h3>Define the diffrent components of your extension from the examples</h3>
        <ul>
        <li> Background script </li>
        <li> Content script </li>
        <li> Popup </li>
        <li> Context menu </li>
        <li> Storage </li>
        <li> Ports </li>
        <li> Inject script </li>
        <li> Inject function </li>
        </ul>
        <p> You can add or remove components as you please in order to define you strategy for the extension </p>
        <p> Because of modularity you can just remove a specific module and it will not affect the rest of the extension </p>
        `
    },
    
}

