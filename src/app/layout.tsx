import React, { ReactNode } from "react";
import "./_app";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>AI Prompt Generator</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 text-gray-900 h-screen font-inter">
        <div className="flex flex-col min-h-screen justify-between">
          <header className="mx-auto max-w-screen-xl py-4 px-8 rounded-none flex items-center justify-between">
            <a href="/" className="text-4xl font-bold text-gray700">
              AI Prompt Generator
            </a>
          </header>
          <main className="flex-grow p-4 flex items-center justify-center bg-gray-100">
            {children}
          </main>
          <footer className="bg-white text-gray-600 py-4 text-center shadow-inner">
            <p>© 2024 AI Prompt Generator. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
