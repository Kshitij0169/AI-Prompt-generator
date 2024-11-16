"use client";
import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState("generalEnhancement");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePrompt = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt before generating.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useCase, prompt }),
      });
      const data = await response.json();
      setEnhancedPrompt(
        data.enhancedPrompt || "Error: Unable to generate prompt."
      );
    } catch (error) {
      console.error("Error generating prompt:", error);
      setEnhancedPrompt("Error: Unable to generate prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full min-w-full bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out">
          <div className="p-6 rounded-lg flex items-center justify-center shadow-lg bg-white border border-gray-300">
            <p className="text-[#9869b8] mb-4 text-center text-xl animate-pulse">
              Generating Prompt
            </p>
            <div className="flex gap-x-2">
              <div className="w-5 h-5 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-purple-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-5 h-5 bg-purple-800 rounded-full animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-white border border-purple-300">
        <div>
          <h1 className="mb-2 text-2xl text-center text-purple-700 font-semibold">
            Your Personal Prompt Engineer
          </h1>
          <div className="w-full relative flex flex-col items-center justify-center mb-6">
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm"></div>
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full"></div>
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[5px] w-1/2 blur-sm"></div>
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/2"></div>
            <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(50%_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-purple-500 font-semibold">
            Select Use Case
          </label>
          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="generalEnhancement">General Enhancement</option>
            <option value="contentGeneration">Content Generation</option>
            <option value="codeReview">Code Review</option>
            <option value="summarization">Summarization</option>
            <option value="translation">Translation</option>
            <option value="grammarCorrection">Grammar Correction</option>
            <option value="customerServiceResponse">
              Customer Service Response
            </option>
            <option value="FAQGeneration">FAQ Generation</option>
            <option value="emailDrafting">Email Drafting</option>
            <option value="reportAnalysis">Report Analysis</option>
            <option value="codeGeneration">Code Generation</option>
          </select>
          <label className="block text-purple-500 font-semibold mt-4">
            Enter Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
            placeholder="Enter a brief prompt here..."
          />
        </div>
        <button
          onClick={handleGeneratePrompt}
          className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-purple-800 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-14 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 hover:bg-purple-600 w-full my-2"
        >
          <span className="text-lg">Generate Enhanced Prompt</span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div className="relative h-full w-10 bg-white/20"></div>
          </div>
        </button>

        <div className="bg-white p-4 rounded-lg border border-purple-300 mt-4">
          <h2 className="text-purple-500 font-semibold">Enhanced Prompt:</h2>
          <p className="mt-2 text-gray-700">
            {enhancedPrompt || "Your enhanced prompt will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
}
