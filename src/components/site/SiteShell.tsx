import type { ReactNode } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { HLB, WA_HREF } from "@/data/hlb";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[oklch(0.78_0.15_85)]" />
  );
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-3 transition-all sm:px-6 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-white/5" : ""
      }`}>
        <Link to="/" className="flex items-center gap-3">
          <LogoMark size={44} />
          <span className="hidden font-display text-xs font-bold tracking-[0.28em] text-white/90 sm:inline">
            HLB CONSTRUCTIONS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[oklch(0.86_0.13_88)]" }}
              className="gold-link transition-colors hover:text-[oklch(0.86_0.13_88)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact"
          className="group relative hidden overflow-hidden rounded-full border border-[oklch(0.78_0.15_85)]/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[oklch(0.86_0.13_88)] transition-colors hover:text-[oklch(0.15_0.03_265)] md:inline-block"
        >
          <span className="absolute inset-0 -translate-x-full bg-[oklch(0.78_0.15_85)] transition-transform duration-500 group-hover:translate-x-0" />
          <span className="relative">Start a Project</span>
        </Link>

        <button aria-label="Open menu" onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white md:hidden"
        >
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[oklch(0.13_0.03_265)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <LogoMark size={44} />
              </Link>
              <button aria-label="Close menu" onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col items-center gap-8 px-6 text-center">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}>
                  <Link to={l.to} onClick={() => setOpen(false)}
                    activeOptions={{ exact: true }} activeProps={{ className: "gold-text" }}
                    className="font-display text-4xl font-black tracking-tight text-white"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)}
                className="mt-6 rounded-full bg-[oklch(0.78_0.15_85)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.15_0.03_265)]"
              >
                Start a Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <LogoMark size={52} />
            <div className="font-display text-xl font-black leading-tight">
              HLB Constructions<br />
              <span className="text-sm text-white/60">High Land Builders &amp; Constructors</span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/55">
            Established 1985 by Tanveer Ishtiaq Khan — a leading Pakistani construction
            company delivering high-rise residential &amp; commercial projects,
            turnkey execution and construction management, registered with PEC (C-4).
          </p>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">Explore</div>
          <div className="mt-3 flex flex-col gap-1 text-white/60">
            <Link to="/" className="gold-link w-fit">Home</Link>
            <Link to="/about" className="gold-link w-fit">About</Link>
            <Link to="/services" className="gold-link w-fit">Services</Link>
            <Link to="/projects" className="gold-link w-fit">Projects</Link>
            <Link to="/contact" className="gold-link w-fit">Contact</Link>
          </div>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">Contact</div>
          <div className="mt-3 space-y-2 text-white/60">
            <a href={`tel:${HLB.phone1}`} className="gold-link flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {HLB.phone1}</a>
            <a href={`tel:${HLB.phone2}`} className="gold-link flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {HLB.phone2}</a>
            <a href={`mailto:${HLB.email}`} className="gold-link flex items-center gap-2 break-all">
              <Mail className="h-3.5 w-3.5" /> {HLB.email}
            </a>
            <div className="flex gap-2 pt-1"><MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span>{HLB.address}</span></div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 sm:flex-row sm:px-6 sm:text-left sm:tracking-[0.3em]">
        <span>© {new Date().getFullYear()} HLB Constructions — All Rights Reserved</span>
        <span>Design · Build · Deliver</span>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={(e) => {
        // Fallback: some in-app browsers ignore target="_blank" on <a>.
        e.preventDefault();
        window.open(WA_HREF, "_blank", "noopener,noreferrer");
      }}
      className="fixed bottom-5 right-5 z-[100] grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-[oklch(0.62_0.16_150)] text-[oklch(0.14_0.03_265)] shadow-[0_0_30px_-4px_oklch(0.62_0.16_150/0.7)] transition-transform hover:scale-110 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.5h-.004a9.87 9.87 0 01-5.03-1.378l-.36-.214-3.744.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.897 9.821 9.821 0 012.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885zm8.413-18.297A11.815 11.815 0 0012.04 0C5.463 0 .11 5.35.108 11.926c0 2.096.549 4.14 1.594 5.945L0 24l6.335-1.652a11.876 11.876 0 005.7 1.448h.006c6.582 0 11.935-5.35 11.938-11.925a11.86 11.86 0 00-3.526-8.667z"/>
      </svg>
    </a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="grain vignette relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ProgressBar />
      <SiteNav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
