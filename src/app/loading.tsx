import { cn } from "@/lib/cn";

export default function GlobalLoading() {
  return (
    <main className="min-h-dvh pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="h-10 w-3/4 rounded-xl bg-brand/10 motion-safe:animate-pulse" />
            <div className="h-6 w-2/3 rounded-xl bg-brand/10 motion-safe:animate-pulse" />
          </div>

          <div
            className={cn(
              "rounded-2xl border border-brand/10 p-6 md:p-8",
              "bg-light-bg-secondary/60 dark:bg-white/5"
            )}
          >
            <div className="space-y-4">
              <div className="h-12 w-full rounded-xl bg-brand/10 motion-safe:animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-brand/10 motion-safe:animate-pulse" />
              <div className="h-32 w-full rounded-xl bg-brand/10 motion-safe:animate-pulse" />
              <div className="h-12 w-44 rounded-xl bg-brand/20 motion-safe:animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
