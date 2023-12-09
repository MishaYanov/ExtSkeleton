import { portNames } from "../../constants/enums";

class BackgroundPortService {
    private static instance: BackgroundPortService;
    private backgroundPort: chrome.runtime.Port;

    private constructor() {
        this.backgroundPort = chrome.runtime.connect({ name: portNames.BACKGROUND });
    }

    public static getInstance(): BackgroundPortService {
        if (!BackgroundPortService.instance) {
            BackgroundPortService.instance = new BackgroundPortService();
        }
        return BackgroundPortService.instance;
    }

    public listenToBackground(callback: (msg: any) => void) {
        this.backgroundPort.onMessage.addListener(callback);
    }

    public sendMessageToBackground(message: any) {
        this.backgroundPort.postMessage(message);
    }
}

export const backgroundPortService = BackgroundPortService.getInstance();
