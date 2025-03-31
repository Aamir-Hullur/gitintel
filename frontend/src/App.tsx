import React from "react";
import RepoInput from "./components/RepoInput";

const App = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
          Read Me Generator
        </h1>
        <p className="text-base sm:text-lg text-gray-700 text-center max-w-xl mx-auto">
          Generate a Read Me Markdown file using a GitHub repository link.
        </p>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-3xl mt-6 sm:mt-8">
          <RepoInput />
        </div>
      </div>
    </main>
  );
};

export default App;
