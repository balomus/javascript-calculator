import { useEffect, useState } from 'react';
import Buttons from './Buttons';
import Formula from './Formula';
import Output from './Output';

function App() {

  const [output, setOutput] = useState("0");
  const [formula, setFormula] = useState("");

  useEffect(() => {
    setFormula(output);
  }, [output]);
  
  return (
    <div className="App">
      <div className="container">
        <Formula />
        <Output output={output} formula={formula}/>
        <Buttons output={output} setOutput={setOutput}/>
      </div>
    </div>
  );
}

export default App;
