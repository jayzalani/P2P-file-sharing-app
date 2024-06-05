// app/layout.tsx
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>P2P File Sharing</title>
      </head>
      <body className="bg-gray-100">{children}</body>
    </html>
  );
};

export default RootLayout;
