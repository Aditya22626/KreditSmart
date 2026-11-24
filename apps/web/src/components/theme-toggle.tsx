"use client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { theme, setTheme } = useTheme();
  return <div className="inline-flex items-center rounded-lg border bg-background p-0.5" role="group" aria-label="Colour theme">
    {([{ value: "light", Icon: Sun }, { value: "dark", Icon: Moon }, { value: "system", Icon: Monitor }] as const).map(({ value, Icon }) => (
      <button key={value} type="button" disabled={!mounted} aria-label={`${value} theme`} aria-pressed={mounted && theme === value} title={`${value} theme`} onClick={() => setTheme(value)} className="grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-muted aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"><Icon className="size-4" aria-hidden="true" /></button>
    ))}
  </div>;
}
