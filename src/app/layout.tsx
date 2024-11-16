import React, { ReactNode } from "react";
import "./_app";
import Image from "next/image";

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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="bg-gray-100 text-gray-900 h-screen font-inter">
        <div className="flex flex-col min-h-screen justify-between">
          <header className="mx-auto py-4 px-8 rounded-none justify-items-center bg-gray-200 w-full shadow-inner">
            <div className="flex justify-center">
              <Image
                src={"/logo1.png"}
                alt={"AI Prompt Generator Logo"}
                width={455}
                height={79}
                className="shadow-lg"
                priority={true}
              />
            </div>
          </header>
          <main className="flex-grow p-4 flex items-center justify-center bg-gray-100">
            {children}
          </main>
          <footer className="bg-gray-200 text-gray-400 py-4 text-center shadow-inner">
            <p>© 2024 AI Prompt Generator. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
