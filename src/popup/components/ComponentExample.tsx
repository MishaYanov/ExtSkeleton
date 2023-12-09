import React, { useEffect, useState } from "react";
import {
  backgroundPortService,
  ContentMessageService,
  StorageService,
} from "../services";
import { portMessages, storageKeys } from "../../constants/enums";
export default function ComponentExample() {
  
  const [answerFromBackground, setAnswerFromBackground] = useState("");
  const [answerFromContent, setAnswerFromContent] = useState("");
  const [answerFromContextMenu, setAnswerFromContextMenu] = useState("");


  const storage = new StorageService();


  useEffect(() => {
    
    backgroundPortService.listenToBackground((message: any) => {
      if (message.type === portMessages.GREETING) {
        setAnswerFromBackground(message.greeting);
      }
    });

    const setMessageFromContext = async () => {
      const msg:any = await fetchMessageFromContext();
      if(msg){
        setAnswerFromContextMenu(msg);
      }
    }
    setMessageFromContext();

    ContentMessageService.listenToContentScript((msg, sender, res) => {
      if (msg.type === portMessages.GREETING) {
        setAnswerFromContent(msg.greeting);
      }
    });

  }, []);

  const fetchMessageFromContext = async () => {
    debugger;
    const contextMessage = await storage.getItem(storageKeys.CONTEXTMENU);
    storage.removeItem(storageKeys.CONTEXTMENU);
    return contextMessage;
  }
  const handleBackgroundMessageEvent = () => {
    backgroundPortService.sendMessageToBackground({
      type: portMessages.GREETING,
      greeting: "Hello Background",
    });
  };

  const handleContentMessageEvent = () => {
    ContentMessageService.sendMessageToActiveContent({
      type: portMessages.GREETING,
      greeting: "Hello Content",
    })
      .then((response) => {
        setAnswerFromContent(response.response);
      })
      .catch((err) => {
        setAnswerFromContent(err);
      });
  };


  const handleInjectionScript = () => {
    debugger;
    backgroundPortService.sendMessageToBackground({type: portMessages.INJECTEXAMPLE})
  };

  const handleTutorialOpen = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('tutorial-page.html') });
  };

  return (
    <div className="test-component">
      <div className="">
        <button onClick={handleBackgroundMessageEvent}>
          click to talk with background
        </button>
      </div>
      <div className="">
        <button onClick={handleContentMessageEvent}>
          click to talk with content
        </button>
      </div>
      <div className="">
        <button onClick={handleInjectionScript}>click to inject script</button>
      </div>
      <div className="">
        <button onClick={handleTutorialOpen}>Open Tutorial</button>
      </div>
      <div className="anwers">
        <p>Answer from background: {answerFromBackground}</p>
        <p>Answer from content: {answerFromContent}</p>
        <p>Answer from the Context Menu: {answerFromContextMenu}</p>
      </div>
    </div>
  );
}
