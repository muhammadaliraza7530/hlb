export const HLB = {
  brand: "HLB Constructions",
  full: "High Land Builders & Constructors",
  founded: 1985,
  founder: "Tanveer Ishtiaq Khan",
  category: "PEC C-4",
  phone1: "0302-8288752",
  phone2: "0333-2108752",
  email: "projects@hlbpk.com",
  address:
    "Office # G-13, Ground Floor, The Court Residency, Plot # 67, Muslimabad Cooperative Housing Society, Dadabhoy Nauroji Road, Karachi",
  logo: "/hlb/logo.png",
};

export const WA_NUMBER = "923028288752";
export const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi HLB Constructions, I'd like to know more about your services."
)}`;

export const PROJECTS = [
  { img: "/hlb/dayany.webp",      title: "DAYANY HEIGHTS",     tag: "Complete Project · High-Rise" },
  { img: "/hlb/safron.webp",      title: "SAFRON HEIGHTS",     tag: "Complete Project · Residential" },
  { img: "/hlb/royal.webp",       title: "ROYAL HOMES",        tag: "Complete Project · Residential" },
  { img: "/hlb/royal-elite.webp", title: "ROYAL ELITE HOMES",  tag: "Complete Project · Luxury" },
  { img: "/hlb/mahran.webp",      title: "MAHRAN TWIN TOWERS", tag: "Complete Project · Towers" },
  { img: "/hlb/burj.webp",        title: "BURJ AL-BARAKA",     tag: "Complete Project · Commercial" },
];

export const HERO_BG_IMAGES = [
  "/hlb/dayany.webp",
  "/hlb/mahran.webp",
  "/hlb/burj.webp",
  "/hlb/royal-elite.webp",
  "/hlb/safron.webp",
];

import { HardHat, Building2, ClipboardCheck } from "lucide-react";

export const SERVICES = [
  {
    slug: "civil-works",
    title: "Civil Works",
    icon: HardHat,
    intro:
      "HighLand Builders & Constructors is a dynamic, progressive organization, registered with the Pakistan Engineering Council as (C-4) Category.",
    highlights: [
      "Structural & foundation works",
      "High-rise residential & commercial",
      "PEC (C-4) registered contractor",
      "Full-scale civil execution",
    ],
  },
  {
    slug: "turnkey",
    title: "Turnkey Project Execution",
    icon: Building2,
    intro:
      "End-to-End Solution · All-In-One Solution · Hassle-Free Construction Service · Streamlined Processes for On-Time Delivery.",
    highlights: [
      "Design + build under one roof",
      "Single point of accountability",
      "Streamlined project delivery",
      "Handover of finished spaces",
    ],
  },
  {
    slug: "management",
    title: "Construction Management",
    icon: ClipboardCheck,
    intro:
      "Proactive Supervision · Balancing Project Iron Triangle · Technical Management · Risk Controlled Execution.",
    highlights: [
      "On-site supervision & QA/QC",
      "Cost, time & scope control",
      "Technical & risk management",
      "Timely progress reporting",
    ],
  },
];

export const PHILOSOPHY = {
  vision:
    "To achieve excellence in construction engineering, execution and management by providing high-quality services on time.",
  mission:
    "To continue towards the betterment of Construction Industry of Pakistan by improving the technical concept of civil engineering and participating in Mega projects that are equally beneficial for our nation as well as help in increasing the overall economy of Pakistan.",
  values:
    "We are committed to maintain the greatest level of professionalism, ethics, innovation, a positive outlook, and execution that meets and exceeds expectations, all while providing timely and long-lasting solutions that stand the test of time.",
};

export const PROCESS = [
  { n: "01", title: "Creating a Concept", body: "Every great structure begins with a concept — we translate your brief into a workable design." },
  { n: "02", title: "Budget Planning",    body: "Transparent budgeting so every rupee is accounted for before ground is broken." },
  { n: "03", title: "Design Process",     body: "Architectural, structural and MEP coordination — engineered to build efficiently." },
  { n: "04", title: "Building Your Dream", body: "On-site execution, quality control and handover — from foundation to finish." },
];
