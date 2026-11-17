/**
 * Reference-counted page scroll lock. The command palette can open over a
 * project panel; each holds its own lock, and the page scrolls again only when
 * the last one is released (a plain overflow toggle let the palette's close
 * unlock the page behind a still-open panel).
 */
let holders = 0;

export function lockScroll(): () => void {
  if (holders++ === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbar ? `${scrollbar}px` : "";
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--holders === 0) {
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  };
}
