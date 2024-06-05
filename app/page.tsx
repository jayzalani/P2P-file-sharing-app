// app/page.tsx
import React from 'react';
import FileUpload from '../components/FileUpload';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">P2P File Sharing App</h1>
      <FileUpload />
    </div>
  );
};

export default HomePage;
