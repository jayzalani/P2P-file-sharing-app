"use client"
import React, { useState, ChangeEvent } from 'react';
import useSocket from '../hooks/useSocket';

const FileUpload: React.FC = () => {
  const socket = useSocket('http://localhost:3000');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      console.log('File selected:', event.target.files[0].name); // Log file selection
    }
  };

  const handleUpload = () => {
    if (file && socket) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const arrayBuffer = reader.result;
          console.log('File data read:', arrayBuffer); // Log file data read
          socket.emit('file-upload', { fileName: file.name, fileData: arrayBuffer }, (response: any) => {
            console.log('Server response:', response); // Log server response
            setUploading(false);
          });
          console.log('File uploaded:', file.name); // Log file upload
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
        Upload
      </button>
      {uploading && <div className="mt-2">Uploading...</div>}
    </div>
  );
};

export default FileUpload;
