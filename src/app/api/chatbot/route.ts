import { NextRequest, NextResponse } from "next/server";
import { chatbotService } from "./chatbotService";

// Utility to simulate streaming
async function* simulateStream(fullText: string, chunkSize = 4, delayMs = 25) {
  let i = 0;
  while (i < fullText.length) {
    yield fullText.slice(i, i + chunkSize);
    i += chunkSize;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  try {
    // Get full response from chatbotService
    const responseTokens = await chatbotService(query);

    let fullText = "";
    for await (const token of responseTokens) {
      fullText += token;
    }

    // Create a ReadableStream to simulate streaming
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of simulateStream(fullText)) {
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    return NextResponse.json({ response: "Error generating response." }, { status: 500 });
  }
}
