import { customEvents } from "./constants";

const eventDispatcher = new EventTarget();

export const DispatchCustomEvent = (event: customEvents)=>{
    eventDispatcher.dispatchEvent(new Event(event));
}

export const addCustomEventListener = (event: customEvents, handler: (event: Event) => void)=>{
    eventDispatcher.addEventListener(event, handler);
}