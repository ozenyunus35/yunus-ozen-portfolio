import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { ScrollFlowDiagram } from "@/components/case-study/ScrollFlowDiagram";
import { ProductDecisionCard } from "@/components/case-study/ProductDecisionCard";
import { ChallengeCard } from "@/components/case-study/ChallengeCard";
import { NextProjectLink } from "@/components/case-study/NextProjectLink";
import { BisevkFlow } from "@/components/project-visualizations/BisevkFlow";
import { bisevkCaseStudy } from "@/lib/data/case-studies/bisevk";
import { hasPublishedContent } from "@/lib/data/case-studies/types";
import { cn } from "@/lib/utils/cn";

export function BiSevkCaseStudy() {
  const cs = bisevkCaseStudy;
  const showProductDecisions = hasPublishedContent(cs.productDecisions.decisions);
  const showChallenges = hasPublishedContent(cs.challenges.items);

  return (
    <article className="case-study pb-[var(--section-spacing)]">
      <CaseStudyNav />

      {/* 01 Hero */}
      <header className="border-b border-border py-[var(--section-spacing-sm)] md:py-[var(--section-spacing)]">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)]">
          <p className="text-label text-muted-foreground">
            Case Study — Ongoing
          </p>
          <h1 className="text-h1 mt-6 text-foreground md:text-display">{cs.hero.title}</h1>
          <p className="text-h3 mt-4 text-muted-foreground">{cs.hero.subtitle}</p>

          <ul className="mt-8 flex flex-wrap gap-2" role="list">
            {cs.hero.roles.map((role) => (
              <li
                key={role}
                className="text-mono border border-border px-2.5 py-1 text-muted-foreground"
              >
                {role}
              </li>
            ))}
          </ul>

          <p className="text-label mt-8 text-accent">{cs.hero.period}</p>

          <div className="mt-12 border border-border bg-surface/50 p-6 md:p-10">
            <BisevkFlow />
          </div>
        </div>
      </header>

      {/* 02 Overview */}
      <CaseStudySection
        id="overview"
        number={cs.overview.number}
        title={cs.overview.title}
      >
        <p className="text-body text-muted-foreground">{cs.overview.content}</p>
      </CaseStudySection>

      {/* 03 The Problem */}
      <CaseStudySection
        id="problem"
        number={cs.problem.number}
        title={cs.problem.title}
      >
        <p className="text-body text-muted-foreground">{cs.problem.content}</p>
      </CaseStudySection>

      {/* 04 Discovery */}
      <CaseStudySection
        id="discovery"
        number={cs.discovery.number}
        title={cs.discovery.title}
        wide
      >
        <p className="text-body mb-10 max-w-2xl text-muted-foreground">
          {cs.discovery.intro}
        </p>
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {cs.discovery.items.map((item) => (
            <div key={item.id} className="bg-surface p-6 md:p-8">
              <p className="text-label text-accent">{item.label}</p>
              <p className="text-body mt-3 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* 05 Product Definition */}
      <CaseStudySection
        id="product-definition"
        number={cs.productDefinition.number}
        title={cs.productDefinition.title}
        wide
      >
        <p className="text-body mb-10 max-w-2xl text-muted-foreground">
          {cs.productDefinition.intro}
        </p>
        <div className="border border-border bg-surface p-6 md:p-10">
          <ScrollFlowDiagram steps={[...cs.productDefinition.flow]} />
        </div>
        <p className="text-small mt-6 max-w-2xl text-muted-foreground">
          {cs.productDefinition.note}
        </p>
      </CaseStudySection>

      {/* 06 User Types */}
      <CaseStudySection
        id="user-types"
        number={cs.userTypes.number}
        title={cs.userTypes.title}
        wide
      >
        <p className="text-body mb-8 max-w-2xl text-muted-foreground">
          {cs.userTypes.intro}
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cs.userTypes.actors.map((actor) => (
            <div
              key={actor.id}
              className="border border-border bg-surface p-6 md:p-8"
            >
              <p className="text-label text-foreground">{actor.label}</p>
              <p className="text-body mt-3 text-muted-foreground">
                {actor.description}
              </p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* 07 Core Product Flow */}
      <CaseStudySection
        id="core-flow"
        number={cs.coreFlow.number}
        title={cs.coreFlow.title}
        wide
      >
        <p className="text-body mb-10 max-w-2xl text-muted-foreground">
          {cs.coreFlow.intro}
        </p>
        <div className="border border-border bg-background p-6 md:p-10">
          <ScrollFlowDiagram steps={[...cs.coreFlow.steps]} />
        </div>
      </CaseStudySection>

      {/* 08 My Role */}
      <CaseStudySection
        id="my-role"
        number={cs.myRole.number}
        title={cs.myRole.title}
        wide
      >
        <p className="text-body mb-10 max-w-2xl text-muted-foreground">
          {cs.myRole.intro}
        </p>

        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {cs.myRole.areas.map((area) => (
            <div key={area.area} className="bg-surface p-6 md:p-8">
              <p className="text-label text-accent">{area.area}</p>
              <ul className="mt-4 space-y-2" role="list">
                {area.responsibilities.map((item) => (
                  <li key={item} className="text-body text-muted-foreground">
                    <span className="text-accent" aria-hidden="true">
                      —{" "}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-l-2 border-accent pl-6">
          <p className="text-label text-muted-foreground">Intersection</p>
          <p className="text-body mt-3 text-foreground">
            {cs.myRole.intersection}
          </p>
        </div>
      </CaseStudySection>

      {/* 09 Development Process */}
      <CaseStudySection
        id="development-process"
        number={cs.developmentProcess.number}
        title={cs.developmentProcess.title}
        wide
      >
        <p className="text-body mb-10 max-w-2xl text-muted-foreground">
          {cs.developmentProcess.intro}
        </p>

        <div className="flex flex-col gap-0 border border-border">
          {cs.developmentProcess.steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "grid grid-cols-1 gap-2 bg-surface p-6 md:grid-cols-[8rem_1fr] md:gap-8 md:p-8",
                index > 0 && "border-t border-border",
              )}
            >
              <p className="text-label text-foreground">{step.label}</p>
              <p className="text-body text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-small mt-6 max-w-2xl text-muted-foreground">
          {cs.developmentProcess.coordination}
        </p>
      </CaseStudySection>

      {/* 10 Product Decisions */}
      {showProductDecisions && (
        <CaseStudySection
          id="product-decisions"
          number={cs.productDecisions.number}
          title={cs.productDecisions.title}
          wide
        >
          <p className="text-body mb-8 max-w-2xl text-muted-foreground">
            {cs.productDecisions.intro}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {cs.productDecisions.decisions.map((decision, index) => (
              <ProductDecisionCard
                key={decision.id}
                decision={decision}
                index={index}
              />
            ))}
          </div>
        </CaseStudySection>
      )}

      {/* 11 Challenges */}
      {showChallenges && (
        <CaseStudySection
          id="challenges"
          number={cs.challenges.number}
          title={cs.challenges.title}
          wide
        >
          <p className="text-body mb-8 max-w-2xl text-muted-foreground">
            {cs.challenges.intro}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {cs.challenges.items.map((challenge, index) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                index={index}
              />
            ))}
          </div>
        </CaseStudySection>
      )}

      {/* 12 Current Status */}
      <CaseStudySection
        id="current-status"
        number={cs.currentStatus.number}
        title={cs.currentStatus.title}
      >
        <p className="text-body text-foreground">{cs.currentStatus.content}</p>
      </CaseStudySection>

      {/* 13 What I Learned */}
      <CaseStudySection
        id="learnings"
        number={cs.learnings.number}
        title={cs.learnings.title}
      >
        <p className="text-body mb-8 text-muted-foreground">
          {cs.learnings.intro}
        </p>
        <ul className="space-y-4" role="list">
          {cs.learnings.items.map((item) => (
            <li
              key={item.id}
              className="border-l border-border pl-6 text-body text-muted-foreground"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      {/* 14 Next Project */}
      <CaseStudySection
        id="next-project"
        number={cs.nextProject.number}
        title={cs.nextProject.title}
        wide
      >
        <NextProjectLink
          slug={cs.nextProject.slug}
          label={cs.nextProject.label}
          description={cs.nextProject.description}
        />
      </CaseStudySection>
    </article>
  );
}
