import { APIGatewayEvent, Context } from "aws-lambda";
import axios from "axios";

interface RequestBody {
  useCase: string;
  details: string;
}

export const handler = async (event: APIGatewayEvent, context: Context) => {
  console.log("Raw event:", event);
  console.log("Raw event body:", event.body);

  const apiKey = process.env.OPENAI_API_KEY;
  let requestBody: RequestBody;

  // Check if event.body is present and an object
  if (typeof event.body === "string") {
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
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
  } else if (typeof event.body === "object" && event.body !== null) {
    requestBody = event.body as RequestBody;
  } else {
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
    const openAiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "chatgpt-4o-latest", // Use "gpt-4" if you have access to it
        messages: [
          {
            role: "user",
            content: `Generate a detailed content outline and introduction for: ${details}`,
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedPrompt =
      openAiResponse.data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        generatedPrompt: generatedPrompt.replace(/\\n/g, "\n"), // Replaces escaped newlines for better readability
      }),
    };
  } catch (error) {
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
};
