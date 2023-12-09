export class ContentMessageService {
    public static sendMessageToActiveContent(message: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // Query for the active tab in the current window
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length === 0) {
                    reject("No active tab found");
                    return;
                }

                const activeTab = tabs[0];
                if (!activeTab.id) {
                    reject("Active tab does not have an ID");
                    return;
                }

                // Send a message to the content script in the active tab
                chrome.tabs.sendMessage(activeTab.id, message, (response) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError.message);
                    } else {
                        resolve(response);
                    }
                });
            });
        });
    }
    public static listenToContentScript(callback: (msg: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void) {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            callback(message, sender, sendResponse);
            return true; 
        });
    }
}
