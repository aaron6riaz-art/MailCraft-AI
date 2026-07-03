import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildEmailPrompt } from "@/lib/prompt";
import type { EmailFormValues, GenerateEmailResponse, ApiErrorResponse } from "@/types";

// Runs on the Node.js runtime so the OpenAI SDK + API key stay server-side only.
export const runtime = "nodejs";

function getClient() {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new OpenAI({ apiKey, baseURL: "https://api.mistral.ai/v1" });
}

function isValidBody(body: unknown): body is EmailFormValues {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.purpose === "string" &&
    b.purpose.trim().length > 0 &&
    typeof b.recipient === "string" &&
    typeof b.tone === "string" &&
    typeof b.length === "string" &&
    typeof b.language === "string" &&
    typeof b.includeClosing === "boolean"
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "The request body was not valid JSON." },
      { status: 400 }
    );
  }

  if (!isValidBody(body)) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "Please describe the purpose of your email before generating." },
      { status: 400 }
    );
  }

  try {
    const client = getClient();
    const { system, user } = buildEmailPrompt(body);

    const completion = await client.chat.completions.create({
      model: "mistral-small-latest",
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const email = completion.choices[0]?.message?.content?.trim();

    if (!email) {
      return NextResponse.json<ApiErrorResponse>(
        { error: "The AI did not return any content. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json<GenerateEmailResponse>({ email });
  } catch (err) {
    if (err instanceof Error && err.message === "MISSING_API_KEY") {
      return NextResponse.json<ApiErrorResponse>(
        {
          error:
            "No Mistral API key is configured on the server. Add MISTRAL_API_KEY to .env.local and restart the dev server.",
        },
        { status: 500 }
      );
    }

    console.error("generate-email error:", err);
    return NextResponse.json<ApiErrorResponse>(
      { error: "Something went wrong while generating your email. Please try again." },
      { status: 500 }
    );
  }
}
