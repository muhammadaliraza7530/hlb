export const HLB = {
  brand: "HLB Constructors",
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
  "Hi HLB Constructors, I'd like to know more about your services."
)}`;

export const PROJECTS = [
  { img: "/hlb/dayany.webp",      title: "The Court Heights",           tag: "Complete Project · High-Rise",      alt: "The Court Heights building exterior" },
  { img: "/hlb/mahran.webp",      title: "The Court Twin Tower",        tag: "Complete Project · Twin Towers",   alt: "The Court Twin Tower buildings" },
  { img: "/hlb/royal-elite.webp", title: "The Court Regency",          tag: "Complete Project · Luxury",       alt: "The Court Regency residential facade" },
  { img: "/hlb/royal.webp",       title: "The Court Industrial Park",    tag: "Complete Project · Industrial",   alt: "The Court Industrial Park facility" },
  { img: "/hlb/safron.webp",      title: "AT Tower",                    tag: "Complete Project · Tower",        alt: "AT Tower high-rise building" },
  { img: "/hlb/burj.webp",        title: "Saima Burj Al Baraka",        tag: "Complete Project · Commercial",   alt: "Saima Burj Al Baraka exterior" },
  { img: "/hlb/dayany.webp",      title: "DAYANY HEIGHTS",             tag: "Complete Project · High-Rise",      alt: "Dayany Heights building exterior" },
  { img: "/hlb/safron.webp",      title: "SAFRON HEIGHTS",             tag: "Complete Project · Residential",    alt: "Safron Heights building exterior" },
  { img: "/hlb/royal.webp",       title: "ROYAL HOMES",                tag: "Complete Project · Residential",    alt: "Royal Homes residential complex" },
  { img: "/hlb/royal-elite.webp", title: "ROYAL ELITE HOMES",         tag: "Complete Project · Luxury",         alt: "Royal Elite Homes residential facade" },
  { img: "/hlb/mahran.webp",      title: "MAHRAN TWIN TOWERS",         tag: "Complete Project · Towers",         alt: "Mahran Twin Towers skyline" },
  { img: "/hlb/burj.webp",        title: "BURJ AL-BARAKA",             tag: "Complete Project · Commercial",    alt: "Burj Al-Baraka commercial tower" },
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
      "PEC registered contractor",
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
