import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>AI Prompt Generator</title>
      </head>
      <body className="bg-primary text-secondary min-h-screen">
        <div className="flex flex-col min-h-screen">
          <header className="p-4 border-b border-gray-800 text-center">
            <h1 className="text-2xl font-semibold">AI Prompt Generator</h1>
          </header>
          <main className="flex-grow p-4">{children}</main>
          <footer className="p-4 border-t border-gray-800 text-center">
            <p>© 2024 AI Prompt Generator</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
