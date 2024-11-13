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
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Generate Your AI Prompt
      </h2>
      <select
        value={selectedUseCase}
        onChange={(e) => setSelectedUseCase(e.target.value)}
        className="w-full p-2 border border-gray-800 bg-primary text-secondary rounded"
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
        className="w-full p-3 border border-gray-800 bg-primary text-secondary rounded"
        rows={4}
      />

      <button
        onClick={handleGeneratePrompt}
        className="w-full p-3 font-semibold text-primary bg-secondary rounded"
      >
        Generate Prompt
      </button>

      {enhancedPrompt && (
        <div className="p-4 border border-gray-800 bg-primary text-secondary rounded mt-4">
          <h3 className="font-semibold">Enhanced Prompt:</h3>
          <p>{enhancedPrompt}</p>
        </div>
      )}
    </div>
  );
}
