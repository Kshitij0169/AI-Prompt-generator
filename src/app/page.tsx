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
          <Card
            className="p-6 rounded-lg flex items-center justify-center shadow-lg bg-white border border-gray-300"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h4"
              className="text-[#9869b8] mb-4 text-center text-xl animate-pulse"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Generating Prompt...
            </Typography>
            <div className="w-full gap-x-2 flex justify-center items-center">
              <div className="w-5 bg-[#d991c2] h-5 rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </Card>
        </div>
      )}
      <Card
        className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-white border border-purple-300"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div>
          <Typography
            variant="h4"
            className="mb-6 text-2xl text-center text-purple-700"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Your Personal Prompt Engineer
          </Typography>
          <div className="w-full relative flex flex-col items-center justify-center pb-5">
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm"></div>
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full"></div>
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[5px] w-1/2 blur-sm"></div>
            <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/2"></div>
            <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(50%_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="space-y-2">
            <Typography
              variant="h6"
              className="text-purple-500"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Select Use Case
            </Typography>
            <SelectMUI
              value={useCase}
              onChange={(value) => setUseCase(value || "")}
              className="p-3 h-11 max-h-20 border border-purple-300 rounded-lg bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-items-center place-items-center"
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
              // }}
              menuProps={{
                className:
                  "bg-white text-gray-800 align-items-center justify-center ease-in-out duration-300 hover:cursor-pointer space-y-2",
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="generalEnhancement"
              >
                Click to choose a use case / Just enter a prompt below...
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="generalEnhancement"
              >
                General Enhancement
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="contentGeneration"
              >
                Content Generation
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="codeReview"
              >
                Code Review
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="summarization"
              >
                Summarization
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="translation"
              >
                Translation
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="grammarCorrection"
              >
                Grammar Correction
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="customerServiceResponse"
              >
                Customer Service Response
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="FAQGeneration"
              >
                FAQ Generation
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="emailDrafting"
              >
                Email Drafting
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="reportAnalysis"
              >
                Report Analysis
              </OptionMUI>
              <OptionMUI
                className="hover:bg-gray-200 transition-all px-2"
                value="codeGeneration"
              >
                Code Generation
              </OptionMUI>
            </SelectMUI>
            <Typography
              variant="h6"
              className="text-purple-500"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Enter Prompt
            </Typography>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 mb-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Enter a brief prompt here..."
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          {/* /* From Uiverse.io by elijahgummer */}
          <button
            onClick={handleGeneratePrompt}
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-purple-600 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-104 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 w-full hover:bg-purple-500"
          >
            <span className="text-lg">Generate Enhanced Prompt</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
          <div className="bg-white p-4 rounded-lg border border-purple-300 mt-4">
            <Typography
              variant="h6"
              className="text-purple-500"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Enhanced Prompt:
            </Typography>
            <Typography
              className="mt-2 text-gray-400"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {enhancedPrompt || "Your enhanced prompt will appear here..."}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
