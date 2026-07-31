export const HLB = {
  brand: "HLB Constructors",
  full: "High Land Builders & Constructors",
  founded: 1985,
  founder: "Tanveer Ishtiaq Khan",
  category: "",
  phone1: "0326-0892858",
  phone2: "", 
  email: "projects@hlbpk.com",
  address:
    "Office # G-13, Ground Floor, The Court Residency, Plot # 67, Muslimabad Cooperative Housing Society, Dadabhoy Nauroji Road, Karachi",
  logo: "/hlb/logo.png",
};

export const WA_NUMBER = "923260892858";
export const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi HLB Constructors, I'd like to know more about your services."
)}`;

type ProjectGalleryEntry = {
  title: string;
  thumbnail: string;
  images: string[];
};

const projectImageModules = import.meta.glob("/public/projectGrally/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

function toProjectGalleryEntries(): ProjectGalleryEntry[] {
  const grouped = new Map<string, ProjectGalleryEntry>();

  Object.entries(projectImageModules).forEach(([filePath, assetUrl]) => {
    const normalizedPath = filePath.replace(/^\/public\//, "");
    const segments = normalizedPath.split("/").filter(Boolean);

    if (segments.length < 2) return;

    const projectName = decodeURIComponent(segments[1]);
    const fileName = decodeURIComponent(segments[segments.length - 1] ?? "");
    const baseName = fileName.replace(/\.[^.]+$/, "").toLowerCase();

    if (!grouped.has(projectName)) {
      grouped.set(projectName, { title: projectName, thumbnail: "", images: [] });
    }

    const entry = grouped.get(projectName)!;
    entry.images.push(assetUrl as string);

    if (entry.thumbnail === "" || baseName === "img1" || baseName.startsWith("img1")) {
      entry.thumbnail = assetUrl as string;
    }
  });

  return Array.from(grouped.values())
    .filter((entry) => entry.title !== "Cant View" && entry.thumbnail)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export const PROJECT_GALLERY = toProjectGalleryEntries();

export const PROJECTS = PROJECT_GALLERY.map((project) => ({
  img: project.thumbnail,
  title: project.title,
  tag: "Complete Project",
  alt: `${project.title} project gallery`,
}));

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
      "HighLand Builders & Constructors is a dynamic, progressive organization, registered with the Pakistan Engineering Council",
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
