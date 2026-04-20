"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="space-y-6 text-left">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Something went wrong</CardTitle>
          <p className="text-muted-foreground text-sm">
            An unexpected error occurred. You can try again or return home.
          </p>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="outline" size="sm" onClick={reset}>
            Try again
          </Button>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm underline underline-offset-4 transition-colors"
          >
            Back to home
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
