"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Raw event:", event);
    console.log("Raw event body:", event.body);
    const apiKey = process.env.OPENAI_API_KEY;
    let requestBody;
    // Check if event.body is present and an object
    if (typeof event.body === "string") {
        try {
            requestBody = JSON.parse(event.body);
        }
        catch (error) {
            console.error("Failed to parse event body:", error);
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "Invalid JSON format in request body.",
                }),
            };
        }
    }
    else if (typeof event.body === "object" && event.body !== null) {
        requestBody = event.body;
    }
    else {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: "Invalid request body format." }),
        };
    }
    // Validate required fields in requestBody
    if (!requestBody.useCase || !requestBody.details) {
        console.warn("Missing parameters:", requestBody);
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Missing required parameters: useCase and details.",
            }),
        };
    }
    const { useCase, details } = requestBody;
    console.log("Use Case:", useCase);
    console.log("Details:", details);
    // Generate the prompt template
    const prompt = `Generate a detailed content outline and introduction for: ${details}`;
    // Call OpenAI API
    try {
        const openAiResponse = yield axios_1.default.post("https://api.openai.com/v1/chat/completions", {
            model: "chatgpt-4o-latest", // Use "gpt-4" if you have access to it
            messages: [
                {
                    role: "user",
                    content: `Generate a detailed content outline and introduction for: ${details}`,
                },
            ],
            max_tokens: 100,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const generatedPrompt = openAiResponse.data.choices[0].message.content.trim();
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                generatedPrompt: generatedPrompt.replace(/\\n/g, "\n"), // Replaces escaped newlines for better readability
            }),
        };
    }
    catch (error) {
        console.error("Error calling OpenAI API:", error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "An error occurred while generating the prompt.",
            }),
        };
    }
});
exports.handler = handler;
