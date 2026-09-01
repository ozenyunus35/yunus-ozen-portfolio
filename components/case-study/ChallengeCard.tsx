import type { CaseStudyChallenge } from "@/lib/data/case-studies/types";

type ChallengeCardProps = {
  challenge: CaseStudyChallenge;
  index: number;
};

export function ChallengeCard({ challenge, index }: ChallengeCardProps) {
  if (challenge.status === "todo") {
    return (
      <div className="border border-dashed border-border bg-surface/50 p-6">
        <p className="text-label text-accent">TODO — Challenge {index + 1}</p>
        <p className="text-small mt-2 text-muted-foreground">
          Verified challenge content pending.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-surface p-6">
      {challenge.title && (
        <h3 className="text-h3 text-foreground">{challenge.title}</h3>
      )}
      {challenge.description && (
        <p className="text-body mt-3 text-muted-foreground">
          {challenge.description}
        </p>
      )}
    </div>
  );
}
