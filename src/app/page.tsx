"use client";
import { useState } from "react";

const useCases = [
  { id: "contentGeneration", label: "Content Generation" },
  { id: "codeReview", label: "Code Review" },
  { id: "summarization", label: "Summarization" },
  { id: "translation", label: "Translation" },
  { id: "grammarCorrection", label: "Grammar Correction" },
  { id: "customerServiceResponse", label: "Customer Service Response" },
  { id: "socialMediaPost", label: "Social Media Post" },
  { id: "FAQGeneration", label: "FAQ Generation" },
  { id: "emailDrafting", label: "Email Drafting" },
  { id: "reportAnalysis", label: "Report Analysis" },
  { id: "generalEnhancement", label: "General Enhancement" },
  { id: "codeGeneration", label: "Code Generation" },
];

export default function HomePage() {
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");

  const handleGeneratePrompt = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useCase: selectedUseCase, prompt }),
      });

      const data = await response.json();
      setEnhancedPrompt(
        data.enhancedPrompt || "Error: Unable to generate prompt."
      );
    } catch (error) {
      console.error("Error generating prompt:", error);
      setEnhancedPrompt("Error: Unable to generate prompt.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-secondary">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 text-center">
        <h2 className="text-3xl font-extrabold mb-4">AI Prompt Generator</h2>
        <p className="text-lg text-gray-400">
          Generate Your AI Prompt with Ease
        </p>

        <select
          value={selectedUseCase}
          onChange={(e) => setSelectedUseCase(e.target.value)}
          className="w-full p-3 border border-gray-700 bg-gray-800 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <option value="" disabled>
            Select Use Case
          </option>
          {useCases.map((useCase) => (
            <option key={useCase.id} value={useCase.id}>
              {useCase.label}
            </option>
          ))}
        </select>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your initial prompt here"
          className="w-full p-3 border border-gray-700 bg-gray-800 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
          rows={5}
        />

        <button
          onClick={handleGeneratePrompt}
          className="w-full py-3 font-semibold text-primary bg-secondary rounded hover:bg-gray-200 transition text-lg"
        >
          Generate Prompt
        </button>

        {enhancedPrompt && (
          <div className="bg-gray-800 p-4 border border-gray-700 rounded mt-4 text-gray-200">
            <h3 className="font-bold text-lg mb-2">Enhanced Prompt:</h3>
            <p className="whitespace-pre-wrap">{enhancedPrompt}</p>
          </div>
        )}
      </div>

      <footer className="text-center text-sm mt-8 text-gray-500">
        © 2024 AI Prompt Generator
      </footer>
    </div>
  );
}
