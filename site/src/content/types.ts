/**
 * Content model for the portfolio.
 *
 * Every word on the site lives in `src/content/*` as typed data; components
 * only render it. To update the site, edit the data, not the components.
 */

export type Role = {
  title: string;
  /** Display string, e.g. "Dec 2025". */
  start: string;
  /** Omit for a current role. */
  end?: string;
  summary?: string;
  /** Responsibilities carried over from the previous role. */
  kept?: string[];
  /** Responsibilities this role added. */
  added?: string[];
};

export type Experience = {
  id: string;
  company: string;
  url?: string;
  logo: string;
  location: string;
  /** Shown instead of the computed date range when exact dates are unknown. */
  dates?: string;
  /** Roles in reverse-chronological order (newest first). */
  roles: Role[];
  highlights: string[];
  tools?: string[];
};

/** An early job, shown compactly: one line each, no logo. */
export type EarlyRole = {
  company: string;
  title: string;
  dates?: string;
  location?: string;
  note?: string;
};

export type ProjectCategory = "Product" | "Game" | "Platform" | "Robotics";

/**
 * A project as the public site shows it: deliberately high level. Unreleased
 * work gets a name, a one-line summary and its progress; never screenshots,
 * mechanics or internals.
 */
export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  status: string;
  period?: string;
  /** Percent complete (0-100) for work in progress; omit for finished projects. */
  progress?: number;
  summary: string;
  /** What I did, for finished work that is fine to describe in depth. */
  details?: string[];
  stack: string[];
  /** An interactive preview shown beside the card (generic, nothing proprietary). */
  showcase?: "phone" | "browser" | "game";
  /** Full-width horizontal card (no preview). */
  wide?: boolean;
  /** Optional photo, for finished work that is fine to show. */
  image?: { src: string; alt: string };
};

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

export type Credential = {
  title: string;
  issuer: string;
  detail: string;
};

export type Education = {
  id: string;
  school: string;
  url: string;
  logo: string;
  degree: string;
  location: string;
  focus?: string;
  coursework: string[];
};
