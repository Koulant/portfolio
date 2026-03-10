import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Career",
};

export default function CareerPage() {
  return (
    <section className="space-y-6 text-left">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Career</CardTitle>
          <p className="text-muted-foreground text-sm">Selected roles and impact highlights.</p>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {experience.map((item) => (
          <Card key={`${item.company}-${item.role}`}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <CardTitle className="text-xl">{item.role}</CardTitle>
                <p className="text-muted-foreground text-sm">{item.period}</p>
              </div>
              <p className="text-muted-foreground text-sm font-medium">{item.company}</p>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 text-sm leading-7">{item.summary}</p>
              <ul className="text-foreground/90 mt-4 list-disc space-y-2 pl-5 text-sm">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
