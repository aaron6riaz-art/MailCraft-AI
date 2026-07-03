import type { EmailFormValues } from "@/types";

/**
 * Builds a structured system + user prompt from the form values.
 * Kept in its own module so the prompt logic can be unit-tested or swapped
 * out independently of the API route / provider.
 */
export function buildEmailPrompt(values: EmailFormValues) {
  const {
    subject,
    purpose,
    recipient,
    tone,
    length,
    language,
    additionalInfo,
    includeClosing,
  } = values;

  const lengthGuide: Record<EmailFormValues["length"], string> = {
    Short: "Keep it to 2-4 short sentences, one tight paragraph.",
    Medium: "Aim for 2-3 short paragraphs, natural and easy to scan.",
    Long: "Write 4-5 paragraphs with clear structure, but never pad with filler.",
  };

  const system = `You are an expert professional email writer.
Write natural, grammatically correct, well-formatted emails.
Rules you must always follow:
- Write in ${language}, regardless of the language of these instructions.
- Match the requested tone precisely: ${tone}.
- ${lengthGuide[length]}
- Include a greeting and a body.
- ${includeClosing ? "End with a professional closing and a signature placeholder like [Your Name]." : "Do not include a formal sign-off closing; end naturally after the body."}
- Never invent facts, names, dates, or details that were not provided.
- If information is missing, keep the email general rather than making something up.
- Output ONLY the finished email text. No preamble, no explanation, no markdown, no quotes around it.`;

  const user = `Email subject: ${subject || "(not provided, infer a suitable one from the purpose)"}
Recipient type: ${recipient}
Purpose / what the email should say: ${purpose}
${additionalInfo ? `Additional context to include: ${additionalInfo}` : ""}`;

  return { system, user };
}
