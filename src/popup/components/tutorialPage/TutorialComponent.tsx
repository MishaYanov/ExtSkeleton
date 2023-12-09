import React, { useEffect, useState } from "react";
import '../../styles/tutorialPage/tutorialMain.scss';
import { extensionComponents } from "./models/dts";
import ExplanationInstance from "./ExplanationInstance";

type TutorialPart = {
  name: string;
  isFlagged: boolean;
  reference: string;
};



export default function TutorialComponent() {
  const [tutorialParts, setTutorialParts] = useState<TutorialPart[]>([] as TutorialPart[]);
  const [chosenPage, setChosenPage] = useState(null);

  useEffect(() => {
    const pNames = Object.keys(extensionComponents);
    const contexPartitions = pNames.map((pName) => {
      const component = extensionComponents[pName];
      return {name: component.name, isFlagged: component.flag, reference: pName} as TutorialPart;
    });
    setTutorialParts(contexPartitions);
  

  }, [])
  

  return (
    <div className="tutorial-wrapper">
      <div className="tutorial-header">
        <div className="tutorial-title">How to Use the Extension Skeleton</div>
        <div className="tutorial-subtitle">
          Explore this tutorial to learn how to use the extension skeleton and modify the features.
        </div>
      </div>
      <div className="tutorial-container">
        <div className="tutorial-dashboard">
          <div className="tutorial-dashboard-title">Topics</div>
          <div className="tutorial-dashboard-list">
            {tutorialParts.map((pName: any) => (
              <div className={`tutorial-dashboard-list-item ${pName.isFlagged? "important":""} ${chosenPage === pName.reference? "active" : ""}`} onClick={()=>{setChosenPage(pName.reference);}}>{pName.name}</div>
            ))}
          </div>
        </div>
        <div className="tutorial-explanation">
          {chosenPage === null ? <div className="default">
              <h1>Please Select a topic You Want To Explore</h1>
          </div> 
          : 
          <ExplanationInstance chosenRef={extensionComponents[chosenPage]}></ExplanationInstance>}
        </div>
      </div>
    </div>
  );
}
