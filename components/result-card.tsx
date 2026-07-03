"use client";

import { Copy, Download, RefreshCw, AlertTriangle, MailOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  subject: string;
  email: string;
  status: "idle" | "loading" | "success" | "error";
  errorMessage?: string;
  onCopy: () => void;
  onDownload: () => void;
  onRegenerate: () => void;
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      <p className="text-sm text-muted">Drafting your email…</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-subtle text-brand">
        <MailOpen className="h-5 w-5" />
      </span>
      <p className="text-sm font-medium text-ink">Your email will appear here</p>
      <p className="max-w-xs text-sm text-muted">
        Fill in the form and click &ldquo;Generate Email&rdquo; to see an AI-drafted email in seconds.
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message?: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-950">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <p className="text-sm font-medium text-ink">Couldn&apos;t generate your email</p>
      <p className="max-w-xs text-sm text-muted">
        {message ?? "Something went wrong. Please try again."}
      </p>
      <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
        <RefreshCw className="h-3.5 w-3.5" />
        Try again
      </Button>
    </div>
  );
}

export function ResultCard({
  subject,
  email,
  status,
  errorMessage,
  onCopy,
  onDownload,
  onRegenerate,
}: ResultCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Generated email</CardTitle>
        <CardDescription>Review, copy, or download the draft below.</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState message={errorMessage} onRetry={onRegenerate} />}
        {status === "idle" && <EmptyState />}
        {status === "success" && (
          <div className="animate-fade-in space-y-4">
            {subject && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Subject</p>
                <p className="mt-1 font-medium text-ink">{subject}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Email</p>
              <div className="mt-2 whitespace-pre-wrap rounded-xl bg-surface p-4 text-sm leading-relaxed text-ink">
                {email}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {status === "success" && (
        <CardFooter className="flex-wrap">
          <Button size="sm" onClick={onCopy}>
            <Copy className="h-3.5 w-3.5" />
            Copy
          </Button>
          <Button size="sm" variant="outline" onClick={onRegenerate}>
            <RefreshCw className="h-3.5 w-3.5" />
            Regenerate
          </Button>
          <Button size="sm" variant="ghost" onClick={onDownload}>
            <Download className="h-3.5 w-3.5" />
            Download .txt
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
