import type { EarlyRole, Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "cmg",
    company: "Coastal Marketing Group",
    url: "https://coastal-marketing.com",
    logo: "/images/logos/cmg.webp",
    location: "Remote",
    roles: [
      {
        title: "Chief Operating Officer",
        start: "Dec 2025",
        summary:
          "Expanded my role to include federal taxes, compliance, vehicle registrations, pricing strategy, and software development, alongside finance, operations, and IT.",
        kept: ["IT", "Operations", "Finance"],
        added: ["Taxes & compliance", "Pricing strategy", "Software development"],
      },
      {
        title: "Chief Financial Officer",
        start: "Jul 2025",
        end: "Dec 2025",
        summary: "Added the company's finances while continuing to run operations and IT.",
        kept: ["IT", "Operations"],
        added: ["Finance"],
      },
      {
        title: "Director of Operations",
        start: "Mar 2024",
        end: "Jul 2025",
        summary:
          "Took on operations while continuing to run IT. Overhauled pricing, commission tracking, and budgeting.",
        kept: ["IT"],
        added: ["Operations"],
      },
      {
        title: "IT Support (Part-time)",
        start: "Aug 2023",
        end: "Mar 2024",
        summary: "Built out the company's IT.",
        added: ["IT"],
      },
    ],
    highlights: [
      "Lead day-to-day operations, finance, pricing, and contractor commissions",
      "Spearheaded the move to Microsoft 365, SharePoint, OneDrive, and 1Password",
      "Automated bookkeeping in QuickBooks Online and manage payroll, taxes, and compliance",
      "Developed the company's web platform for orders, invoicing, pricing, and reporting, along with its website and a partner portal for customers and contractors",
    ],
    tools: ["Microsoft 365", "SharePoint", "1Password", "QuickBooks Online", "Next.js", "PostgreSQL"],
  },
  {
    id: "unlv",
    company: "University of Nevada, Las Vegas",
    url: "https://www.unlv.edu/",
    logo: "/images/logos/unlv.webp",
    location: "Las Vegas, NV · Remote",
    roles: [{ title: "Graduate Assistant", start: "Jan 2022", end: "May 2022" }],
    highlights: ["Assisted students in data structures and automata theory 20 hours a week and graded coursework"],
  },
  {
    id: "wd",
    company: "Western Digital",
    url: "https://www.westerndigital.com/",
    logo: "/images/logos/wd.webp",
    location: "Irvine, CA · Remote",
    roles: [
      { title: "Systems Design Verification Engineer", start: "Jan 2021", end: "Sep 2021" },
      { title: "Systems Design Verification Engineering Intern", start: "Jun 2020", end: "Aug 2020" },
    ],
    highlights: [
      "Debugged and validated E1.S and M.2 drives in the Enterprise SSD division on a 200-person team",
      "Automated test execution in Python for Microsoft, Facebook, and AWS programs",
      "Triaged firmware and script failures in JIRA and maintained test documentation",
      "Ran validation testing against drive specifications on Ubuntu",
    ],
    tools: ["Python", "JIRA", "Linux"],
  },
  {
    id: "tutoring",
    company: "Cal State Fullerton & Irvine Valley College",
    url: "https://www.fullerton.edu/",
    logo: "/images/logos/csuf.webp",
    location: "Fullerton & Irvine, CA",
    dates: "About 2 years",
    roles: [{ title: "Engineering & Computer Science Tutor", start: "2018", end: "2020" }],
    highlights: [
      "Tutored physics, programming, calculus, electrical engineering, and music",
      "Partnered with the Assistant Dean of Natural Sciences and Mathematics to improve the Cal State Fullerton tutoring center",
    ],
  },
  {
    id: "brainstorm",
    company: "Brainstorm STEM Education",
    url: "https://brainstormedu.com/",
    logo: "/images/logos/brainstorm.webp",
    location: "Irvine, CA",
    roles: [{ title: "Lead Technology Instructor", start: "Jan 2017", end: "Aug 2018" }],
    highlights: [
      "Developed the company's only Python course, an advanced eight-week program on GUIs and PyGame",
      "Taught programming, game development, chemistry, 3D printing, and physics",
      "Led demonstrations at community events that brought in hundreds of returning clients",
    ],
    tools: ["Python", "Unity", "Unreal Engine", "C#"],
  },
];

/** First jobs, newest first. Kept to one line each. */
export const earlyExperience: EarlyRole[] = [
  {
    company: "Alessa",
    title: "Food Runner",
    dates: "May 2015 – Feb 2016",
    location: "Laguna Beach, CA",
    note: "Trained new servers and handled purchasing for the owner.",
  },
  {
    company: "Keller Williams Realty",
    title: "Real Estate Assistant",
    dates: "Summer 2014",
    note: "Handled lead generation, file organization, and spreadsheet automation for an agent.",
  },
  {
    company: "Pavilions",
    title: "Cashier",
    dates: "Jul 2013 – Apr 2014",
    note: "Stocked and received inventory and served as second in charge on morning shifts.",
  },
  {
    company: "Romeo Cucina",
    title: "Restaurant Staff",
    dates: "Summer 2013",
    location: "Laguna Beach, CA",
  },
];

/** Volunteer work, shown under the early jobs. */
export const volunteering: EarlyRole[] = [
  {
    company: "Zero Trash Laguna",
    title: "Volunteer",
    dates: "2012 – 2013",
    location: "Laguna Beach, CA",
    note: "Cleaned the streets and beaches of Laguna Beach.",
  },
];
