import type { Metadata } from "next";

import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Career",
};

export default function CareerPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Career</h1>
        <p className="text-muted-foreground">Selected roles and impact highlights.</p>
      </div>

      <div className="space-y-6">
        {experience.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="border-border rounded-lg border p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-semibold">{item.role}</h2>
              <p className="text-muted-foreground text-sm">{item.period}</p>
            </div>
            <p className="text-muted-foreground mt-1 text-sm font-medium">{item.company}</p>
            <p className="text-foreground/90 mt-4 text-sm leading-7">{item.summary}</p>
            <ul className="text-foreground/90 mt-4 list-disc space-y-2 pl-5 text-sm">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
