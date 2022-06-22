import React, { useState, useEffect } from "react"
import axios from 'axios'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import './App.css';

function App() {
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const [filedataurl, setFiledataurl] = useState('')
  const [viewPdf, setViewPdf] = useState('')
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  useEffect(() => {
    togetBuff()
      .then(() => {
      }).catch((err) => console.log(err))

  }, [viewPdf]);

  const togetBuff = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/v1/fileBlobupload/${viewPdf}`
    );
    var base64Data = res.data;
    var pdfview = `data:application/pdf;base64,${base64Data}`;
    setFiledataurl(pdfview)
  }

  const onFileChange = (event) => {
    setFile(event.target.files[0])
    setName(event.target.files[0].name)
  }


  const onFileUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("expenses", file);
    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/fileBlobupload',
      data: formData
  })
  .then(function (response) {
      console.log(response.data);
      setViewPdf(response.data)
  })
  .catch(function (error) {
      console.log(error);
  });
  }

  return (
    <div className="container">
      <br></br>
      <form className="form-group" onSubmit={(e) => onFileUpload(e)} enctype="multipart/form-data">
        <input type="file" name="expenses" className="form-control" onChange={(event) => onFileChange(event)} required />
        <br></br>
        <button type="submit" className="btn btn-success btn-lg">
          UPLOAD
        </button>
      </form>
      <br></br>
      <h4>View PDF</h4>
      <div className="pdf-container">
        {filedataurl ?
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
            <Viewer fileUrl={filedataurl}
              plugins={[defaultLayoutPluginInstance]} />
          </Worker>
          : ""}
      </div>
    </div>
  );
}

export default App;
