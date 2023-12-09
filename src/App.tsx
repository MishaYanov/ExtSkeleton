import { useState } from 'react'
import './popup/styles/App.scss'
import ComponentExample from './popup/components/ComponentExample';

function App() {
  return (
    <div className="App">
      <h1>Hello from extension</h1>
      <p>Test the connection between the diffrent parts of the extension</p>
      <ComponentExample></ComponentExample>
    </div>
  )
}

export default App
