/**
 * Phone mockup for an unreleased app. Shows placeholder shapes only:
 * no features, screens or names until the app launches.
 */
export function PhoneShowcase() {
  return (
    <div className="flex flex-col items-center gap-5" aria-hidden="true">
      <div className="relative w-[240px] shrink-0 rounded-[38px] border border-line-strong bg-zinc-950 p-[7px] shadow-float">
        <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-white dark:bg-zinc-900">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-2.5 text-[10px] font-semibold text-white">
            <span>9:41</span>
            <span className="absolute top-2 left-1/2 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-zinc-950" />
            <span className="h-2 w-3 rounded-[2px] border border-white/80" />
          </div>
          <div className="h-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-500" />
          <ul className="space-y-3 p-5">
            {[0.9, 0.7, 0.8, 0.6].map((w, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="size-9 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-700" />
                <span className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-700" style={{ width: `${w * 100}%` }} />
              </li>
            ))}
          </ul>
          <div className="absolute inset-0 grid place-items-center bg-white/50 dark:bg-zinc-900/50">
            <span className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
