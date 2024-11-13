import { NextResponse } from "next/server";
import axios from "axios";

const useCaseConfigs: {
  [key: string]: { systemPrompt: string; temperature: number };
} = {
  contentGeneration: {
    systemPrompt:
      "Act as a Prompt Engineer. Rewrite the following input as a detailed prompt for generating high-quality, plagiarism-free, engaging content. Limit the response to 800 characters",
    temperature: 0.7,
  },
  codeReview: {
    systemPrompt:
      "Act as a Prompt Engineer. Transform the input into a prompt that guides AI to write accurate, error-free code with best practices. Limit the response to 800 characters",
    temperature: 0.4,
  },
  summarization: {
    systemPrompt:
      "Act as a Prompt Engineer. Rephrase the input as a prompt that will guide the AI to summarize the text concisely and clearly. Limit the response to 800 characters",
    temperature: 0.3,
  },
  translation: {
    systemPrompt:
      "Act as a Prompt Engineer. Convert the following input into a prompt that guides AI to accurately translate the text into a specified language. Limit the response to 800 characters",
    temperature: 0.5,
  },
  grammarCorrection: {
    systemPrompt:
      "Act as a Prompt Engineer. Reframe the input to create a prompt that guides AI to correct grammar, enhance readability, and make the text sound human-written. Limit the response to 800 characters",
    temperature: 0.2,
  },
  customerServiceResponse: {
    systemPrompt:
      "Act as a Prompt Engineer. Rewrite the input as a prompt that would guide the AI to generate a professional, empathetic response to a customer inquiry. Limit the response to 800 characters",
    temperature: 0.3,
  },
  socialMediaPost: {
    systemPrompt:
      "Act as a Prompt Engineer. Reframe the input as a creative prompt that guides AI to generate an engaging, visually appealing social media post. Limit the response to 800 characters",
    temperature: 0.8,
  },
  FAQGeneration: {
    systemPrompt:
      "Act as a Prompt Engineer. Rewrite the input as a prompt to guide AI in generating frequently asked questions based on the given context. Limit the response to 800 characters",
    temperature: 0.5,
  },
  emailDrafting: {
    systemPrompt:
      "Act as a Prompt Engineer. Reframe the input to create a professional prompt guiding AI in drafting a concise, well-structured email. Limit the response to 800 characters",
    temperature: 0.3,
  },
  reportAnalysis: {
    systemPrompt:
      "Act as a Prompt Engineer. Rewrite the input as a prompt that will guide the AI to analyze report data and provide insights. Limit the response to 800 characters",
    temperature: 0.4,
  },
  generalEnhancement: {
    systemPrompt:
      "Act as a Prompt Engineer. Enhance the following input prompt to make it as clear and effective as possible for any AI task, covering all relevant details for the use case. Limit the response to 800 characters",
    temperature: 0.6,
  },
  codeGeneration: {
    systemPrompt:
      "Act as a Prompt Engineer. Rewrite the input as a prompt that guides the AI to generate code with accurate adherence to best practices and minimal errors. Limit the response to 800 characters",
    temperature: 0.3,
  },
};

export async function POST(request: Request) {
  try {
    const { useCase, prompt } = await request.json();

    // Check for required fields
    if (!useCase || !prompt) {
      return NextResponse.json(
        { message: "Missing required fields: useCase and prompt." },
        { status: 400 }
      );
    }

    // Retrieve the configuration for the selected use case
    const config = useCaseConfigs[useCase];
    if (!config) {
      return NextResponse.json(
        { message: `Invalid use case: ${useCase}` },
        { status: 400 }
      );
    }

    // Call OpenAI API to generate enhanced prompt
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "chatgpt-4o-latest", // or "gpt-4" if available
        messages: [
          { role: "system", content: config.systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: config.temperature,
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract and return the enhanced prompt from the API response
    const enhancedPrompt = response.data.choices[0].message.content.trim();

    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "An error occurred while generating the enhanced prompt." },
      { status: 500 }
    );
  }
}
