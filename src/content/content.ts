import contentScriptMessenger from "./modules/ContentScriptMessenger";
import { injectScript } from "./modules";
import { portMessages } from "../constants/enums";


contentScriptMessenger.sendMessageToBackground({ type: portMessages.GREETING, payload: "Hello from the content script" });

injectScript();