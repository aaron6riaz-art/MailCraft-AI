export type Recipient =
  | "Client"
  | "Customer"
  | "Coworker"
  | "Boss"
  | "Teacher"
  | "Supplier"
  | "Friend"
  | "Other";

export type Tone =
  | "Professional"
  | "Friendly"
  | "Formal"
  | "Casual"
  | "Persuasive"
  | "Apologetic"
  | "Confident"
  | "Enthusiastic";

export type Length = "Short" | "Medium" | "Long";

export type Language = "English" | "Dutch" | "French" | "German" | "Spanish";

export interface EmailFormValues {
  subject: string;
  purpose: string;
  recipient: Recipient;
  tone: Tone;
  length: Length;
  language: Language;
  additionalInfo: string;
  includeClosing: boolean;
}

export interface GenerateEmailRequest extends EmailFormValues {}

export interface GenerateEmailResponse {
  email: string;
}

export interface ApiErrorResponse {
  error: string;
}
