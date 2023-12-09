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

portHandler.customListener((msg) => {
    if(msg.type === portMessages.INJECTEXAMPLE){
        injectFunction("example");
    }
});