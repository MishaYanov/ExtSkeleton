import { portMessages } from "../../constants/enums";

class ContentScriptMessenger {
    constructor() {
        this.listenForMessages();
    }

    listenForMessages() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === portMessages.GREETING) {
                console.log("Greeting message received:", message.payload);
               
                sendResponse({ type: portMessages.GREETING, status: "success", response: "Greeting received" });
            }
            return true;
        });
    }

    public sendMessageToPopup(message: any) {
        chrome.runtime.sendMessage(message, response => {
            console.log("Response from popup:", response);
        });
    }

    public sendMessageToBackground(message: any) {
        chrome.runtime.sendMessage(message, response => {
            console.log("Response from background:", response);
        });
    }
}

const contentScriptMessenger = new ContentScriptMessenger();
export default contentScriptMessenger;
