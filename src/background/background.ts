import { PortHandler, createContextMenuItem, BackgroundStorage, injectFunction } from './modules';
enum portMessages {
    GREETING = 'greeting',
    INJECTEXAMPLE = "injectExample"
}
enum portNames {
    BACKGROUND = 'background',
}


const portHandler = new PortHandler();
const storage = new BackgroundStorage();

createContextMenuItem(storage);


const greeting = () => {
    portHandler.customListener((msg) => {
        if (msg.type === portMessages.INJECTEXAMPLE) {
            injectFunction("example");
        }
    });
}

chrome.tabs.onActivated.addListener(activeInfo => {
    greeting();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url || changeInfo.status === "loading") {
        greeting();
    }
});