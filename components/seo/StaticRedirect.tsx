"use client";

import { useEffect } from "react";

type StaticRedirectProps = {
  target: string;
};

export function StaticRedirect({ target }: StaticRedirectProps) {
  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-body text-muted-foreground">
        <a href={target} className="underline">
          Continue
        </a>
      </p>
    </main>
  );
}
