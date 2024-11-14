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
// Define enhanced configuration for each use case with specific system prompts and temperature settings
const useCaseConfigs = {
    contentGeneration: {
        systemPrompt: "You are a Prompt Engineer. Generate a prompt that will guide AI to produce detailed, engaging, and plagiarism-free content. Focus on key points, structure the content logically, and specify any desired tone or style. Avoid generating the content; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.7,
    },
    codeReview: {
        systemPrompt: "You are a Prompt Engineer. Create a prompt to guide an AI to perform a comprehensive code review. Instruct the AI to focus on identifying bugs, improving efficiency, and adhering to best practices. Specify a structured, methodical approach. Avoid performing the review yourself; only provide a guiding prompt. Limit the response to 800 characters",
        temperature: 0.4,
    },
    summarization: {
        systemPrompt: "You are a Prompt Engineer. Reframe the input as a prompt for AI to summarize text concisely. Include instructions for the summary to capture main ideas, avoid redundancy, and remain under a specified word count. Avoid summarizing the text; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.3,
    },
    translation: {
        systemPrompt: "You are a Prompt Engineer. Generate a prompt to guide AI in translating the provided text accurately, preserving cultural nuances and context. Specify the target language and any tone considerations. Avoid translating the text yourself; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.5,
    },
    grammarCorrection: {
        systemPrompt: "You are a Prompt Engineer. Formulate a prompt to instruct AI to correct grammar, improve clarity, and ensure a professional tone. Specify that AI should avoid altering the meaning while enhancing readability. Avoid making corrections; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.2,
    },
    customerServiceResponse: {
        systemPrompt: "You are a Prompt Engineer. Create a prompt to guide AI in generating a professional and empathetic customer service response. Instruct the AI to address the customer’s concerns directly and politely, using a warm, helpful tone. Avoid generating the response yourself; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.3,
    },
    socialMediaPost: {
        systemPrompt: "You are a Prompt Engineer. create a prompt that will guide an AI to generate an engaging social media post that is captivating and visually appealing aimed at engaging the target audience. Specify desired tone, and any specific points to highlight.  The output should only be a detailed prompt suggestion, not the actual content of the post. Limit the response to 800 characters",
        temperature: 0.8,
    },
    FAQGeneration: {
        systemPrompt: "You are a Prompt Engineer. Create a prompt to guide AI in generating frequently asked questions (FAQs) relevant to the given topic. Instruct the AI to cover common queries and provide clear, concise answers. Avoid generating the FAQs; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.5,
    },
    emailDrafting: {
        systemPrompt: "You are a Prompt Engineer. Generate a prompt that instructs AI to draft a concise, professional email, with a clear subject line and relevant information. Specify a formal tone and any particular points to address. Avoid drafting the email yourself; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.3,
    },
    reportAnalysis: {
        systemPrompt: "You are a Prompt Engineer. Create a prompt to guide AI in analyzing a report and providing actionable insights. Instruct the AI to focus on key trends, patterns, and any recommended next steps. Avoid analyzing the report yourself; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.4,
    },
    generalEnhancement: {
        systemPrompt: "You are a Prompt Engineer. Based on the provided input, create the best possible prompt to guide an AI to achieve the desired outcome. Enhance clarity, structure, and provide specific guidance where possible. Do not generate the content; provide only the most effective guiding prompt. Limit the response to 800 characters",
        temperature: 0.6,
    },
    codeGeneration: {
        systemPrompt: "You are a Prompt Engineer. Craft a prompt to guide an AI in generating accurate, efficient code that adheres to best practices. Specify the language if applicable, include any specific requirements, and emphasize minimal errors and robust structure. Avoid writing the code yourself; provide only the guiding prompt. Limit the response to 800 characters",
        temperature: 0.3,
    },
};
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Incoming request event:", JSON.stringify(event));
    let requestBody;
    try {
        // Parse event body if it's a string; otherwise, use it directly as an object
        requestBody =
            typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    }
    catch (error) {
        console.error("JSON parsing error:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid JSON format in request body." }),
        };
    }
    const { useCase, prompt } = requestBody || {};
    // Validate required parameters
    if (!useCase || !prompt) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Missing required parameters: useCase and prompt.",
            }),
        };
    }
    // Retrieve the use case configuration
    const config = useCaseConfigs[useCase];
    if (!config) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: `Invalid use case: ${useCase}` }),
        };
    }
    try {
        // Call the OpenAI API with the system-guided prompt and temperature setting
        const openAiResponse = yield axios_1.default.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: config.systemPrompt },
                { role: "user", content: prompt },
            ],
            temperature: config.temperature,
            max_tokens: 100,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });
        // Extract and return the enhanced prompt
        const enhancedPrompt = openAiResponse.data.choices[0].message.content.trim();
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ enhancedPrompt }),
        };
    }
    catch (error) {
        // Check if error is an instance of AxiosError to access response data
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error calling OpenAI API:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
        else if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        else {
            console.error("Unknown error:", error);
        }
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "An error occurred while generating the enhanced prompt.",
            }),
        };
    }
});
exports.handler = handler;
