"use client";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import {
  Select as SelectMUI,
  Option as OptionMUI,
} from "@material-tailwind/react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState("generalEnhancement");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");

  const handleGeneratePrompt = async () => {
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
    }
  };

  return (
    <div className="flex items-center justify-center h-full min-w-full bg-gray-100">
      <Card className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-white border border-purple-300">
        <Typography
          variant="h4"
          className="mb-6 text-2xl text-center text-purple-700"
        >
          Your Personal Prompt Engineer
        </Typography>
        <CardBody>
          <div className="space-y-4">
            <Typography variant="h6" className="text-purple-600">
              Select Use Case
            </Typography>
            <SelectMUI
              value={useCase}
              onChange={(value) => setUseCase(value || "")}
              className="p-3 h-11 max-h-20 border border-purple-300 rounded-lg text-center bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              menuProps={{
                className:
                  "bg-white text-gray-800 align-items-center justify-center",
              }}
            >
              <OptionMUI value="generalEnhancement">
                Click to choose any use case...
              </OptionMUI>
              <OptionMUI value="generalEnhancement">
                General Enhancement
              </OptionMUI>
              <OptionMUI value="contentGeneration">
                Content Generation
              </OptionMUI>
              <OptionMUI value="codeReview">Code Review</OptionMUI>
              <OptionMUI value="summarization">Summarization</OptionMUI>
              <OptionMUI value="translation">Translation</OptionMUI>
              <OptionMUI value="grammarCorrection">
                Grammar Correction
              </OptionMUI>
              <OptionMUI value="customerServiceResponse">
                Customer Service Response
              </OptionMUI>
              <OptionMUI value="socialMediaPost">Social Media Post</OptionMUI>
              <OptionMUI value="FAQGeneration">FAQ Generation</OptionMUI>
              <OptionMUI value="emailDrafting">Email Drafting</OptionMUI>
              <OptionMUI value="reportAnalysis">Report Analysis</OptionMUI>
              <OptionMUI value="codeGeneration">Code Generation</OptionMUI>
            </SelectMUI>

            <Typography variant="h6" className="text-purple-600">
              Enter Prompt
            </Typography>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Enter a brief prompt here..."
            />
          </div>
          {/* /* From Uiverse.io by elijahgummer */}
          <button
            onClick={handleGeneratePrompt}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-purple-800 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-104 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 w-full hover:bg-purple-600"
          >
            <span className="text-lg">Generate Enhanced Prompt</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
          <div className="bg-white p-4 rounded-lg border border-purple-300 mt-4">
            <Typography variant="h6" className="text-purple-600">
              Enhanced Prompt:
            </Typography>
            <Typography className="mt-2 text-gray-400">
              {enhancedPrompt || "Your enhanced prompt will appear here..."}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
