import React, { useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Calendar, IdCard, Flag, Sigma, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/**
 * Fact Check List Pattern — Blog Post / Interactive Demo
 * - Intro: why fact-checking matters in AI
 * - Examples: hallucinations vs. corrected facts
 * - Interactive quiz: Spot the error
 * - CTA: Use the pattern next time you write
 *
 * Tailwind + shadcn/ui, lucide-react icons
 */

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-white shadow-sm">
    {children}
  </span>
);

const FlowArrow = () => (
  <ArrowRight className="mx-2 h-6 w-6 shrink-0" aria-hidden />
);

const FactItem = ({
  label,
  verdict,
  correction,
}: {
  label: string;
  verdict: "accurate" | "false" | "misleading" | "unverifiable";
  correction?: string;
}) => {
  const icon = {
    accurate: <CheckCircle2 className="h-5 w-5" />,
    false: <XCircle className="h-5 w-5" />,
    misleading: <AlertTriangle className="h-5 w-5" />,
    unverifiable: <HelpCircle className="h-5 w-5" />,
  }[verdict];

  const labelText = {
    accurate: "Accurate",
    false: "False",
    misleading: "Misleading",
    unverifiable: "Unverifiable",
  }[verdict];

  const color = {
    accurate: "text-emerald-600",
    false: "text-rose-600",
    misleading: "text-amber-600",
    unverifiable: "text-slate-600",
  }[verdict];

  return (
    <div className="rounded-xl border p-4 bg-white/70">
      <div className="flex items-start gap-3">
        <div className={`${color}`}>{icon}</div>
        <div className="space-y-1">
          <p className="font-medium">{label}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`${color} bg-transparent border-0 px-0`}>{labelText}</Badge>
            {correction && (
              <span className="text-slate-600">→ Correction: <span className="font-semibold text-slate-900">{correction}</span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [choice, setChoice] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const answers = useMemo(
    () => ({
      A: { correct: true, label: "A", text: "The Treaty of Versailles was signed in 1919." },
      B: { correct: false, label: "B", text: "The Great Wall of China is visible from space with the naked eye." },
      C: { correct: true, label: "C", text: "The Amazon River flows through Brazil." },
    }),
    []
  );

  const evaluate = () => setSubmitted(true);

  const feedback = () => {
    if (!submitted) return null;
    const isCorrectPick = choice === "B"; // B is the inaccurate claim
    return (
      <div className={`mt-4 rounded-lg border p-4 ${isCorrectPick ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
        {isCorrectPick ? (
          <p className="text-emerald-700 font-medium">Nice catch! "B" is false — it's a myth that the Great Wall is visible unaided from space.</p>
        ) : (
          <p className="text-rose-700 font-medium">Not quite. The inaccurate statement is "B". Try again or expand the explanations below.</p>
        )}
        <details className="mt-3">
          <summary className="cursor-pointer text-slate-700">Show explanations</summary>
          <ul className="mt-2 list-disc pl-6 text-slate-700 space-y-1">
            <li><span className="font-semibold">A</span> — Accurate: Treaty of Versailles was signed in 1919.</li>
            <li><span className="font-semibold">B</span> — False: Astronauts report it's not visible to the naked eye; photos require telephoto lenses/conditions.</li>
            <li><span className="font-semibold">C</span> — Accurate: The Amazon River does flow through Brazil.</li>
          </ul>
        </details>
      </div>
    );
  };

  const Option = ({ id, text }: { id: string; text: string }) => (
    <label htmlFor={id} className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer bg-white ${choice===id?"ring-2 ring-slate-900":"hover:bg-slate-50"}`}>
      <input id={id} type="radio" name="quiz" className="mt-1" checked={choice===id} onChange={() => setChoice(id)} />
      <span>{text}</span>
    </label>
  );

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Interactive Quiz: Spot the Error</CardTitle>
        <CardDescription>Select the statement that is inaccurate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3">
          <Option id="A" text={answers.A.text} />
          <Option id="B" text={answers.B.text} />
          <Option id="C" text={answers.C.text} />
        </div>
        <div className="flex gap-2">
          <Button onClick={evaluate} disabled={!choice}>Check Answer</Button>
          <Button variant="secondary" onClick={() => { setChoice(""); setSubmitted(false); }}>Reset</Button>
        </div>
        {feedback()}
      </CardContent>
    </Card>
  );
};

export default function FactCheckListBlogDemo() {

  const handleStartFactChecking = () => {
    // Opens ChatGPT in a new tab
    window.open("https://chat.openai.com/", "_blank", "noopener,noreferrer");
  };

  const handleDownloadChecklist = () => {
    // Make sure the file exists at /public/fact-check-checklist.pdf
    const link = document.createElement("a");
    link.href = "/fact-checklist-pattern-guide.pdf";
    link.download = "fact-checklist-pattern-guide.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Fact Check List Pattern</h1>
          <p className="mt-3 text-lg text-slate-700 max-w-3xl">
            AI can write fast—but not always accurately. The Fact Check List Pattern helps you turn fluent text into <span className="font-semibold">trustworthy</span> prose by breaking claims into small, checkable facts and verifying each one before you publish.
          </p>
        </header>

        {/* Flow / Icons */}
        <section className="mb-12">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">How it Works</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Pill>Claim</Pill>
              <FlowArrow />
              <Pill>
                <span className="mr-2">Checklist</span>
              </Pill>
              <FlowArrow />
              <Pill>
                <span className="mr-2">Verified Output</span>
              </Pill>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex flex-col items-center gap-2 rounded-xl border bg-slate-50 p-4">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Date</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border bg-slate-50 p-4">
                <IdCard className="h-6 w-6" />
                <span className="text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border bg-slate-50 p-4">
                <Flag className="h-6 w-6" />
                <span className="text-sm">Event</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border bg-slate-50 p-4">
                <Sigma className="h-6 w-6" />
                <span className="text-sm">Logic</span>
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-12 space-y-4">
          <h2 className="text-xl font-semibold">Hallucinations vs. Corrected Facts</h2>
          <FactItem label="World War I began in 1915." verdict="false" correction="1914" />
          <FactItem label="Einstein won the Nobel Prize for relativity." verdict="false" correction="He won in 1921 for the photoelectric effect." />
          <FactItem label="The Eiffel Tower is in Berlin." verdict="false" correction="It's in Paris." />
        </section>

        {/* Quiz */}
        <section className="mb-12">
          <Quiz />
        </section>

        {/* Real-world case */}
        <section className="mb-12">
          <Card className="border-0 shadow-lg bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-xl">Real-World Case: History Essay Correction</CardTitle>
              <CardDescription>
                A student uses AI to draft an essay. The Fact Check List Pattern flags each claim before submission.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border bg-white p-4">
                <p className="font-medium">Claim: "WWI began in 1915 and the Treaty of Versailles was signed in 1920."</p>
                <ul className="mt-2 list-disc pl-6 text-slate-700">
                  <li>WWI began in <span className="font-semibold">1914</span> → <span className="text-emerald-700 font-semibold">Corrected</span></li>
                  <li>Treaty of Versailles was signed in <span className="font-semibold">1919</span> → <span className="text-emerald-700 font-semibold">Corrected</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="mb-20 text-center">
          <h2 className="text-2xl font-bold">Use the Fact Check List Pattern next time you write!</h2>
          <p className="mt-2 text-slate-700">Break claims → Check facts → Publish with confidence.</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={handleStartFactChecking}>
              Start Fact-Checking
            </Button>
            <Button variant="secondary" size="lg" onClick={handleDownloadChecklist}>
              Download Fact Check List Pattern Guide
            </Button>
          </div>
        </section>

        <footer className="border-t pt-6 text-center text-sm text-slate-500">
          Built as a teaching demo. No external data fetched.
        </footer>
      </div>
    </div>
  );
}
