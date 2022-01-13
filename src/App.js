import { useEffect, useState } from 'react';
import Buttons from './Buttons';
import Formula from './Formula';
import Output from './Output';

function App() {

  const [output, setOutput] = useState("0");
  const [formula, setFormula] = useState("0");
  const [runningFormula, setRunningFormula] = useState("");

  useEffect(() => {

  }, []);
  
  return (
    <div className="App">
      <div className="container">
        <Formula formula={formula} runningFormula={runningFormula}/>
        <Output output={output} formula={formula}/>
        <Buttons output={output} setOutput={setOutput} formula={formula} setFormula={setFormula} runningFormula={runningFormula} setRunningFormula={setRunningFormula}/>
      </div>
    </div>
  );
}

export default App;
