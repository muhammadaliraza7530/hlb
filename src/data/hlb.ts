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

export type ProjectGalleryEntry = {
  title: string;
  thumbnail: string;
  images: string[];
};

const projectImageModules = import.meta.glob(
  "/public/projectGrally/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
);

function normalizePublicAssetPath(filePath: string): string {
  return filePath.replace(/^\/public/, "") || "/";
}

function getImageSortValue(fileName: string): number {
  const match = fileName.match(/(\d+)/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return Number(match[1]);
}

const PRIORITY_ORDER = [
  "The Court Heights",
  "The Court Regency",
  "The Court Twin Towers",
  "The Court Industrial Park",
  "DAYANY HEIGHTS",
  "Creek View Tower",
  "BAHRIA HOSPITAL",
  "BAHRIA HOUSES",
  "ROYAL ELITE HOMES",
  "ABEEDA TOWERS",
  "MAHRAN TWIN TOWERS",
  "Jinnah Hospital",
  "Cant View",
];

function toProjectGalleryEntries(): ProjectGalleryEntry[] {
  const grouped = new Map<string, ProjectGalleryEntry>();

  Object.keys(projectImageModules).forEach((filePath) => {
    const segments = filePath.replace(/^\/public\//, "").split("/").filter(Boolean);
    if (segments.length < 3) return;

    const projectName = decodeURIComponent(segments[1]);

    if (!grouped.has(projectName)) {
      grouped.set(projectName, { title: projectName, thumbnail: "", images: [] });
    }

    grouped.get(projectName)!.images.push(normalizePublicAssetPath(filePath));
  });

  return Array.from(grouped.values())
    .filter((entry) => entry.images.length > 0)
    .map((entry) => {
      const sortedImages = [...entry.images].sort((a, b) => {
        const aName = a.split("/").pop() ?? "";
        const bName = b.split("/").pop() ?? "";
        const diff = getImageSortValue(aName) - getImageSortValue(bName);
        return diff !== 0 ? diff : aName.localeCompare(bName);
      });

      return { ...entry, images: sortedImages, thumbnail: sortedImages[0] };
    })
    .sort((a, b) => {
      const aIndex = PRIORITY_ORDER.indexOf(a.title);
      const bIndex = PRIORITY_ORDER.indexOf(b.title);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.title.localeCompare(b.title);
    });
}

export const PROJECT_GALLERY = toProjectGalleryEntries();

export const PROJECTS = PROJECT_GALLERY.map((project) => ({
  img: project.thumbnail,
  thumbnail: project.thumbnail,
  galleryImages: project.images,
  images: project.images,
  title: project.title,
  tag: project.title === "The Court Heights" ? "Ongoing Project" : "Complete Projects",
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
