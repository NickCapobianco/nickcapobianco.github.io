"use client";

import { useEffect, useState } from "react";

/**
 * Types and deletes each phrase in turn. Server-renders the first phrase so
 * the hero is meaningful before hydration and for crawlers; reduced-motion
 * users get a static phrase.
 */
export function RotatingText({ items }: { items: readonly string[] }) {
  const [text, setText] = useState(items[0] ?? "");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || items.length < 2) return;
    setAnimated(true);

    let i = 0;
    let chars = items[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = items[i];
      if (!deleting && chars === word.length) {
        deleting = true;
        timer = setTimeout(tick, 2200);
        return;
      }
      if (deleting && chars === 0) {
        deleting = false;
        i = (i + 1) % items.length;
        timer = setTimeout(tick, 250);
        return;
      }
      chars += deleting ? -1 : 1;
      setText(items[i].slice(0, chars));
      timer = setTimeout(tick, deleting ? 28 : 55);
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <span>
      <span className="sr-only">{items.join(", ")}</span>
      <span aria-hidden="true" className={animated ? "caret" : undefined}>
        {text}
      </span>
    </span>
  );
}
