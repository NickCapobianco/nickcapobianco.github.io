import type { Project } from "./types";

/**
 * Public project summaries. Keep these high level: no screenshots, rules,
 * feature lists or internals for anything unreleased.
 */
export const projects: Project[] = [
  {
    id: "mobile-app",
    name: "Mobile App",
    category: "Product",
    status: "In development",
    period: "Jun 2026 – Present",
    progress: 85,
    summary:
      "A mobile app I'm designing and developing. The preview here is just the tip of the iceberg. The full app comes out at launch.",
    stack: ["Kotlin", "Jetpack Compose"],
    showcase: "phone",
  },
  {
    id: "cmg-platform",
    name: "CMG Operations Platform",
    category: "Platform",
    status: "In development",
    period: "Mar 2026 – Present",
    progress: 85,
    summary:
      "The web platform I developed for Coastal Marketing Group. It handles orders, invoicing, pricing, and automated reporting, syncs with QuickBooks Online, and runs the company website and partner portal.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "QuickBooks Online"],
    showcase: "browser",
  },
  {
    id: "windows-game",
    name: "Windows Game",
    category: "Game",
    status: "Gameplay complete",
    period: "Nov 2025 – Present",
    progress: 85,
    summary: "A desktop game for Windows, built in Unity. Gameplay is complete, and I'm now working on the final art.",
    stack: ["Unity", "C#"],
    wide: true,
  },
  {
    id: "usv",
    name: "Unmanned Surface Vehicle",
    category: "Robotics",
    status: "Senior design project · Cal State Fullerton",
    summary:
      "Converted a Traxxas RC boat into an autonomous-ready sensing platform that could be driven from a laptop on a remote lake without Bluetooth.",
    details: [
      "Ran PyTorch object detection on an NVIDIA Jetson Nano with an Intel RealSense camera, recording footage under way.",
      "Visualized LIDAR point clouds in RViz over ROS.",
      "Soldered an SPST override switch into the Traxxas remote for manual takeover.",
      "Added flotation for the extra payload. The boat held 30+ mph carrying 8 lb of equipment with no water damage.",
    ],
    stack: ["NVIDIA Jetson Nano", "Intel RealSense", "PyTorch", "ROS", "RViz", "LIDAR", "Linux"],
    image: { src: "/images/projects/usv.webp", alt: "The unmanned surface vehicle on the water" },
  },
  {
    id: "exlf",
    name: "ExLF Autonomous Vehicle",
    category: "Robotics",
    status: "Completed",
    summary:
      "Built a small-scale version of the US Army's Expedient Leader-Follower (ExLF) concept, where an unmanned vehicle follows a human-driven lead vehicle at close range.",
    details: [
      "Measured distance to a moving object with an ultrasonic rangefinder and held a set following distance.",
      "Used mecanum wheels and two motor drivers so the vehicle could move diagonally forward and backward.",
      "Showed live readings on an onboard LCD.",
    ],
    stack: ["Arduino Mega 2560", "C++", "Ultrasonic rangefinder", "Mecanum wheels"],
    image: { src: "/images/projects/exlf.webp", alt: "The ExLF autonomous vehicle" },
  },
];

export const projectCategories = ["All", "Product", "Game", "Platform", "Robotics"] as const;
