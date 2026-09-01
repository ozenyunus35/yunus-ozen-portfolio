import type { ProductDecision } from "@/lib/data/case-studies/types";
import { cn } from "@/lib/utils/cn";

type ProductDecisionCardProps = {
  decision: ProductDecision;
  index: number;
};

export function ProductDecisionCard({
  decision,
  index,
}: ProductDecisionCardProps) {
  if (decision.status === "todo") {
    return (
      <div
        className={cn(
          "border border-dashed border-border bg-surface/50 p-6 md:p-8",
        )}
      >
        <p className="text-label text-accent">TODO — Decision {index + 1}</p>
        <p className="text-small mt-3 text-muted-foreground">
          Verified decision content pending. Structure prepared for: Problem,
          Context, Options, Decision, Reasoning, Result.
        </p>
      </div>
    );
  }

  const fields = [
    { label: "Problem", value: decision.problem },
    { label: "Context", value: decision.context },
    { label: "Options", value: decision.options?.join(" · ") },
    { label: "Decision", value: decision.decision },
    { label: "Reasoning", value: decision.reasoning },
    { label: "Result", value: decision.result },
  ].filter((f) => f.value);

  return (
    <div className="border border-border bg-surface p-6 md:p-8">
      {decision.title && (
        <h3 className="text-h3 text-foreground">{decision.title}</h3>
      )}
      <dl className="mt-6 space-y-5">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-label text-accent">{field.label}</dt>
            <dd className="text-body mt-2 text-muted-foreground">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
