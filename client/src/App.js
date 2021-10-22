import axios from 'axios';
import './App.css';
import React, {useState} from "react";
function App() {
  const[ code, setCode] = useState('');
  const[output,setOutput] = useState('');

  const handleSubmit = async() =>{

    const payload = {
      language : "cpp",
      code
    };
    try{
    const {data} = await axios.post("http://localhost:5000/run",payload)
    setOutput(data.output);
    }catch(err){
      console.log(err.respose);
    }
    
  }

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <textarea 
      value = {code} 
      onChange = {(e) =>{
        setCode(e.target.value);
        }}
      cols="80" 
      rows="20">
      </textarea>
      <br />
      <button onClick = {handleSubmit}>Submit</button>

      <p>{output}</p>
    </div>
  );
}

export default App;
