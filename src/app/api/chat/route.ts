import { GoogleGenerativeAI,   HarmCategory, HarmBlockThreshold, } from "@google/generative-ai";
import { NextResponse } from "next/server";


 interface UserMessage {
   content: string;
 }

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);


const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 2000,
  temperature: 0.7,
  history: [
    {
      role: "user",
      parts: [
        {text: "Hello"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Hello! 👋  I'm here to help you find the best web development resources. What are you interested in learning about today? 😊 \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "Can you provide resources related to sports?"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I can only guide you on web development resources. \n\nIs there anything specific you'd like to learn about in web development? I'm happy to help! 😊 \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "what is web development"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Web development is the process of creating and maintaining websites. It encompasses various aspects, including:\n\n* **Front-end development:** Building the user interface (UI) that users interact with, using languages like HTML, CSS, and JavaScript.\n* **Back-end development:**  Creating the server-side logic that powers the website, using languages like Python, Ruby, PHP, or Node.js.\n* **Database management:** Storing and retrieving data from databases using technologies like SQL or NoSQL.\n* **Testing and deployment:** Ensuring the website functions correctly and making it accessible to users.\n\nThere are many different paths you can take in web development, depending on your interests and goals. 😄 \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "provide 3 youtube video links"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Here are 3 YouTube video links that can help you get started with web development:\n\n1. **\"Web Development for Beginners - Full Course\" by freeCodeCamp.org:** [https://www.youtube.com/watch?v=mP029o7ECk0](https://www.youtube.com/watch?v=mP029o7ECk0) This comprehensive course covers the basics of HTML, CSS, and JavaScript. \n2. **\"Learn HTML & CSS from Scratch - Full Tutorial\" by Traversy Media:** [https://www.youtube.com/watch?v=pQN-pnXPaVg](https://www.youtube.com/watch?v=pQN-pnXPaVg)  This video covers the fundamentals of HTML and CSS, and is great for beginners.\n3. **\"JavaScript Tutorial for Beginners\" by The Net Ninja:** [https://www.youtube.com/watch?v=hdI2bqOjy3c](https://www.youtube.com/watch?v=hdI2bqOjy3c)  This tutorial offers a comprehensive introduction to JavaScript, covering syntax, variables, functions, and more. \n\n\n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "resources for sports"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I can only guide you on web development resources. \n\nAre you interested in building a website for a sports team or league? Or perhaps creating a web application related to sports statistics? I can help you find the right resources to get started. 😊 \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "what is Assistant?"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I am Assistant, a chatbot specializing in providing information and resources related to web development. I can help you learn about various aspects of web development, suggest relevant learning materials, and answer your questions. 😊 \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "What is your name?"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I'm \"Web Dev Assistant\"! 😊  I'm here to help you with all things web development. \n"},
      ],
    },
  ],
};

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",   systemInstruction: "Your are a \"Assistant\" and name is \"Sifra a Web Dev Assistant\" and you are a chatbot that specializes in web development resources. Assistant should be able to provide links to relevant resources and offer general guidance on web development topics. The chatbot should be designed to understand and respond to a variety of user prompts related to web development. If a user's query falls outside the scope of web development resources, Assistant should politely respond with \"I can only guide you on web development resources. and every answer should be polite and it should be precise not too long.\"", });


export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { messages }: { messages: UserMessage[] } = await req.json();
    const prompt = messages[messages.length - 1].content;
    const result = await model.generateContent(prompt);

    return new NextResponse(result.response.text(), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}