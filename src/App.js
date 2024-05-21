import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const FileUpload = () => {
  const location = useLocation();
  const [dbStorage, setDbStorage] = useState([
    {
      path: location.pathname, // Initialize path with current URL
      filesInfo: [],
    },
  ]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const updatedDbStorage = dbStorage.map((item, index) => {
      if (index === 0) {
        // Append the uploaded files to the existing filesInfo array
        return {
          ...item,
          filesInfo: [...item.filesInfo, ...uploadedFiles],
        };
      }
      return item;
    });
    setDbStorage(updatedDbStorage);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      {dbStorage.map((storageItem, index) => (
        <div key={index}>
          <h3>Path: {storageItem.path}</h3>
          <div>
            {storageItem.filesInfo.map((file, fileIndex) => (
              <div key={fileIndex}>{file.name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUpload;
