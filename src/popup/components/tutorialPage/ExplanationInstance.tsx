import React from 'react'
import { IExtensionComponent } from './models/interfaces';

type ExplanationInstance = {
    chosenRef: IExtensionComponent;
}

export default function ExplanationInstance(props: ExplanationInstance) {
  return (
    <div className='instance-wrapper'>
        <div className='instance-title'><h1>{props.chosenRef.name}</h1></div>
        <div className='instance-description'><h2>{props.chosenRef.description}</h2></div>
        {props.chosenRef.link && <div className="instance-link"><a href={props.chosenRef.link} target='_blank'>Link to chrome documentation</a></div>}
        <div dangerouslySetInnerHTML={{ __html: props.chosenRef.layoutOfPage? props.chosenRef.layoutOfPage :"" }} />
    </div>
  )
}
