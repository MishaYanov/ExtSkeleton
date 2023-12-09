import { functionsForInjector } from "../models/dts";

export const injectFunction =  async (funcRef:any): Promise<any> => {
    debugger
    const tabId:any = await getTabId();
    if (!tabId) throw new Error("Tab not found");
    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: functionsForInjector[funcRef],
        }, (injectionResults) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(injectionResults);
            }
        });
    });
}

const getTabId = async () => {
    const [tabs]:any =  await chrome.tabs.query({ active:true });
    debugger
    return tabs?.[0]?.id ?? tabs.id;
};