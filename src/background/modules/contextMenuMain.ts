import { storageKeys } from "./constants";

export function createContextMenuItem(storage: any) {
    chrome.runtime.onInstalled.addListener((details) => {
        if (details.reason !== "install" && details.reason !== "update") return;
        chrome.contextMenus.create({
            id: "sampleContextMenu",
            title: "Send Message to Popup",
            contexts: ["all"]
        });
    });

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId === "sampleContextMenu") {
            storage.setItem(storageKeys.CONTEXTMENU, "message from context menu");
        }
    });
}

