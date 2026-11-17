export type NavSection = { id: string; label: string; shortcut: string };

/** Single source of truth for page sections: header nav, scroll-spy, and command palette. */
export const sections: NavSection[] = [
  { id: "about", label: "About", shortcut: "1" },
  { id: "experience", label: "Experience", shortcut: "2" },
  { id: "projects", label: "Projects", shortcut: "3" },
  { id: "skills", label: "Skills", shortcut: "4" },
  { id: "education", label: "Education", shortcut: "5" },
  { id: "contact", label: "Contact", shortcut: "6" },
];
