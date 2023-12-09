const exampleLoaction: string = "injected/exampleScript.js";

export function injectScript() {
    const node = document.head || document.documentElement;
    if (node) {
        let browsiScript = document.createElement('script');
        browsiScript.src = chrome.runtime.getURL(exampleLoaction);
        browsiScript.type = 'text/javascript';
        browsiScript.id = "yourname";
        browsiScript.async = true;
        node.appendChild(browsiScript);
        browsiScript.onload = () => {
            browsiScript.remove();
        };
    }
}