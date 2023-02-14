import React, { useState } from "react";
// Library to render out the JSON data from the file.
import ReactJson from 'react-json-view';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [fileData, setFileData] = useState(null);

  // On the onchange event file will be save to state
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // On clicking the button passes through different validations before uploading to server.
  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    console.log('filetype:', file.type);

    // Checking if the file type is strictly JSON. If the file type is
    // not JSON then we return with an error.
    if (file.type !== "application/json") {
      setError("Invalid file type. Please select a JSON file");
      return;
    }

    // Getting the file contents from the file.
    const fileContents = await getFileContents(file);

    // Checking if the file contents is valid JSON format. Returns true if the 
    // contents are valid JSON format. Else we return false.
    const isValid = isValidJSON(fileContents);
    if (!isValid) {
      setError("The selected file is not a valid JSON file");
      return;
    }

    setError(null);
  };


  // Function to get the contents of the file.
  const getFileContents = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsText(file);
    });
  };

  // Function to check if the file contents are valid JSON format.
  const isValidJSON = (fileContents) => {
    try {
      JSON.parse(fileContents);
      setFileData(JSON.parse(fileContents));
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <div>
      {/* Input filed that accepts only a file of JSON type */}
      <div className="card">
        <div className="card-header">JSON Validation</div>
        <div className="card-body">
          <input type="file" className="form-control" onChange={handleFileChange} accept="application/json" />
          <button className="btn btn-outline-primary float-end mt-2" onClick={handleFileUpload}>Upload</button>
          {error && <div className="error">{error}</div>}

          {/* Render the JSON content of the file */}
        </div>
        <div className="card-footer">
          {fileData && <ReactJson style={{ width: '100%', height: '50%', fontSize: 16 }} src={fileData} theme="ocean" />}
        </div>
      </div>
      <div>

      </div>

    </div>
  );
};

export default FileUpload;
