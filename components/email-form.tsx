"use client";

import * as React from "react";
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/result-card";
import { useToast } from "@/hooks/use-toast";
import { cn, downloadTextFile } from "@/lib/utils";
import type {
  EmailFormValues,
  GenerateEmailResponse,
  ApiErrorResponse,
  Recipient,
  Tone,
  Length,
  Language,
} from "@/types";

const RECIPIENTS: Recipient[] = [
  "Client",
  "Customer",
  "Coworker",
  "Boss",
  "Teacher",
  "Supplier",
  "Friend",
  "Other",
];

const TONES: Tone[] = [
  "Professional",
  "Friendly",
  "Formal",
  "Casual",
  "Persuasive",
  "Apologetic",
  "Confident",
  "Enthusiastic",
];

const LENGTHS: Length[] = ["Short", "Medium", "Long"];
const LANGUAGES: Language[] = ["English", "Dutch", "French", "German", "Spanish"];

const PURPOSE_MAX = 600;

const DEFAULT_VALUES: EmailFormValues = {
  subject: "",
  purpose: "",
  recipient: "Coworker",
  tone: "Professional",
  length: "Medium",
  language: "English",
  additionalInfo: "",
  includeClosing: true,
};

type Status = "idle" | "loading" | "success" | "error";

export function EmailGenerator() {
  const [values, setValues] = React.useState<EmailFormValues>(DEFAULT_VALUES);
  const [status, setStatus] = React.useState<Status>("idle");
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [purposeError, setPurposeError] = React.useState<string>();
  const { toast } = useToast();

  function update<K extends keyof EmailFormValues>(key: K, value: EmailFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function generate(formValues: EmailFormValues) {
    if (!formValues.purpose.trim()) {
      setPurposeError("Please describe what your email should be about.");
      return;
    }
    setPurposeError(undefined);
    setStatus("loading");
    setErrorMessage(undefined);

    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = (await res.json()) as GenerateEmailResponse | ApiErrorResponse;

      if (!res.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Unknown error");
      }

      setEmail(data.email);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    generate(values);
  }

  function handleRegenerate() {
    generate(values);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      toast({ title: "Email copied successfully!", variant: "success" });
    } catch {
      toast({ title: "Couldn't copy to clipboard", variant: "error" });
    }
  }

  function handleDownload() {
    const filename = `${values.subject || "email"}.txt`.replace(/\s+/g, "-").toLowerCase();
    downloadTextFile(filename, email);
    toast({ title: "Download started", variant: "success" });
  }

  return (
    <section id="generator" className="bg-surface px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Build your email
          </h2>
          <p className="mt-3 text-muted">
            Fill in a few details and let AI draft it for you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Email details</CardTitle>
              <CardDescription>The more context you give, the better the draft.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <Label htmlFor="subject">Email subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g. Following up on our meeting"
                    value={values.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    maxLength={120}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="purpose">Purpose</Label>
                    <span className="text-xs text-muted">
                      {values.purpose.length}/{PURPOSE_MAX}
                    </span>
                  </div>
                  <Textarea
                    id="purpose"
                    rows={4}
                    placeholder="Describe what your email should be about..."
                    value={values.purpose}
                    maxLength={PURPOSE_MAX}
                    onChange={(e) => {
                      update("purpose", e.target.value);
                      if (e.target.value.trim()) setPurposeError(undefined);
                    }}
                    aria-invalid={Boolean(purposeError)}
                    className={cn(purposeError && "border-red-400 focus-visible:ring-red-400")}
                  />
                  {purposeError && (
                    <p className="mt-1.5 text-xs text-red-500">{purposeError}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Select
                      id="recipient"
                      value={values.recipient}
                      onChange={(e) => update("recipient", e.target.value as Recipient)}
                    >
                      {RECIPIENTS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select
                      id="tone"
                      value={values.tone}
                      onChange={(e) => update("tone", e.target.value as Tone)}
                    >
                      {TONES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="length">Length</Label>
                    <Select
                      id="length"
                      value={values.length}
                      onChange={(e) => update("length", e.target.value as Length)}
                    >
                      {LENGTHS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      id="language"
                      value={values.language}
                      onChange={(e) => update("language", e.target.value as Language)}
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional information (optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    rows={3}
                    placeholder="Any extra details to include..."
                    value={values.additionalInfo}
                    onChange={(e) => update("additionalInfo", e.target.value)}
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={values.includeClosing}
                    onChange={(e) => update("includeClosing", e.target.checked)}
                  />
                  <span className="text-sm text-ink">Include a professional closing</span>
                </label>

                <Button type="submit" className="w-full" disabled={status === "loading"}>
                  <Wand2 className="h-4 w-4" />
                  {status === "loading" ? "Generating…" : "Generate Email"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <ResultCard
            subject={values.subject}
            email={email}
            status={status}
            errorMessage={errorMessage}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onRegenerate={handleRegenerate}
          />
        </div>
      </div>
    </section>
  );
}
