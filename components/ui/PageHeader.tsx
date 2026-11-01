import { SectionLabel } from "@/components/prism/SectionLabel";

type PageHeaderProps = {
  label: string;
  title: string;
  titleMuted?: string;
  description?: string;
  className?: string;
};

export function PageHeader({ label, title, titleMuted, description, className }: PageHeaderProps) {
  return (
    <header className={className}>
      <SectionLabel label={label} className="anim-rise" />
      <h1 className="text-display anim-rise mt-6 max-w-3xl font-display" style={{ animationDelay: "60ms" }}>
        {title}
        {titleMuted && (
          <>
            {" "}
            <span className="text-muted-foreground">{titleMuted}</span>
          </>
        )}
      </h1>
      {description && (
        <p className="text-body anim-rise mt-6 max-w-2xl text-muted-foreground" style={{ animationDelay: "120ms" }}>
          {description}
        </p>
      )}
    </header>
  );
}
