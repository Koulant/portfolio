import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <section className="space-y-6 text-left">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Page Not Found</CardTitle>
          <p className="text-muted-foreground text-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </CardHeader>
        <CardContent>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
          >
            Back to home
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
