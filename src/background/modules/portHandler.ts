import { MessageTypes } from "../models/types";
import { DispatchCustomEvent, addCustomEventListener } from "./BackgroundEventDispatcher";
import { portMessages, portNames, customEvents } from "./constants";

export class PortHandler {
    private port!: chrome.runtime.Port;


    constructor() {
        chrome.runtime.onConnect.addListener((newPort) => {
            if (newPort.name === portNames.BACKGROUND) {
                this.port = newPort;
                DispatchCustomEvent(customEvents.PORT_CONNECTED_EVENT_TYPE);
                this.port.onMessage.addListener((msg) => {
                    if(msg.type === portMessages.GREETING){
                        console.log("Message received from popup: " + JSON.stringify(msg));
                        this.sendMessage({ type: "greeting", greeting: "Response from background script" });
                    }
                });
            }
        });
    }

    private async waitForPortConnnection(): Promise<void> {
        return new Promise((resolve) => {
            if(this.port){
                resolve();
            }
            addCustomEventListener(customEvents.PORT_CONNECTED_EVENT_TYPE, () => {
                console.log("Port connected");
                resolve();
            });
        });
    }

    public async sendMessage(message: MessageTypes) {
        await this.waitForPortConnnection();
        if (this.port) {
            this.port.postMessage(message);
        } else {
            console.log("Port not initialized");
        }
    }

   
    public async customListener(listener: (msg: any) => void) {
        await this.waitForPortConnnection();
        console.log("Adding listener");
        if(this.port){
            this.port.onMessage.addListener(listener);
        } else {
            console.log("Port not initialized");
        }
    }

    public closePort() {
        if (this.port) {
            this.port.disconnect();
        } else {
            console.log("Port not initialized");
        }
    }
}