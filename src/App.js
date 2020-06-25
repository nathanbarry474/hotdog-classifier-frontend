import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const [result, setResult] = useState(null)

  const fileSelectedHandler = e => {
    setSelectedFile(e.target.files[0])
    setFileURL(URL.createObjectURL(e.target.files[0]))
  }

  const fileUploadHandler = e => {
    let fd = new FormData();
    fd.append('image', selectedFile)
    axios.post('http://127.0.0.1:5000/predict', fd)
    .then(res => setResult(res.data.class_name))
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <h2 className='title'><span role="img" aria-label="hotdog">🌭</span> Hotdog Or Not?</h2>
      <input type='file' onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
      <br/>
      <img className='img' alt='Uploaded' src={fileURL} width='40%'/>
      <h2>{result}</h2>
    </div>
  );
}

export default App;