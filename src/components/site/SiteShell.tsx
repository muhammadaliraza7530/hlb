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

// Custom easing for a more premium feel
const easeOutExpo = [0.22, 1, 0.36, 1] as const;

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[oklch(0.78_0.15_85)] to-[oklch(0.86_0.13_88)] shadow-[0_0_10px_oklch(0.78_0.15_85)]"
    />
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 transition-all duration-500 lg:px-10 ${scrolled
        ? "backdrop-blur-xl bg-[oklch(0.13_0.03_265)]/70 border-b border-white/5 py-3"
        : "bg-transparent py-5"
        }`}>
        <Link to="/" className="group flex items-center gap-3">
          <div className="transition-transform duration-500 group-hover:rotate-[10deg] bg-transparent">
            <LogoMark size={62} />
          </div>
          <span className="hidden font-display text-[11px] font-bold tracking-[0.3em] text-white/90 transition-colors group-hover:text-white sm:inline">
            HLB Constructors
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="group relative transition-colors duration-300 hover:text-white"
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px bg-[oklch(0.78_0.15_85)] transition-all duration-500 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                </>
              )}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="group relative hidden overflow-hidden rounded-full border border-[oklch(0.78_0.15_85)]/40 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[oklch(0.86_0.13_88)] transition-all duration-500 hover:border-[oklch(0.78_0.15_85)] hover:text-[oklch(0.15_0.03_265)] md:inline-block"
        >
          <span className="absolute inset-0 -z-10 translate-y-full bg-[oklch(0.78_0.15_85)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          Start a Project
        </Link>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/10 md:hidden"
        >
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="fixed inset-0 z-50 bg-[oklch(0.10_0.02_265)]/95 backdrop-blur-2xl md:hidden"
          >
            {/* Decorative Background Elements */}
            <div className="pointer-events-none absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[oklch(0.78_0.15_85)]/10 blur-[100px]" />

            <div className="relative flex items-center justify-between px-6 py-5">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <LogoMark size={42} />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-16 flex flex-col items-center gap-10 px-6 text-center">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + 0.06 * i, duration: 0.6, ease: easeOutExpo }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: true }}
                    className="font-display text-5xl font-black tracking-tight text-white/70 transition-colors hover:text-white"
                    activeProps={{ className: "text-white" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + 0.06 * links.length, duration: 0.6, ease: easeOutExpo }}
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-6 rounded-full bg-[oklch(0.78_0.15_85)] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.15_0.03_265)] shadow-[0_8px_30px_-8px_oklch(0.78_0.15_85)]"
                >
                  Start a Project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[oklch(0.10_0.02_265)] pt-20">
      {/* Top Glow */}
      <div className="pointer-events-none absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[oklch(0.78_0.15_85)] to-transparent opacity-50" />

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-12 lg:px-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <LogoMark size={56} />
            <div className="font-display text-2xl font-black leading-tight tracking-tight">
              HLB Constructors
              <div className="text-sm font-sans font-normal tracking-normal text-white/40">
                High Land Builders &amp; Constructors
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/45">
            Established 1985 by Tanveer Ishtiaq Khan — a leading Pakistani construction
            company delivering high-rise residential &amp; commercial projects,
            turnkey execution and construction management, registered with PEC.
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">Explore</div>
          <div className="mt-5 flex flex-col gap-3 text-white/50">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="group flex items-center gap-2 w-fit text-sm transition-colors hover:text-white">
                <span className="h-px w-0 bg-[oklch(0.78_0.15_85)] transition-all duration-300 group-hover:w-4"></span>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Section - Strictly uniform alignment for all items */}
        <div className="md:col-span-3">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">Contact</div>
          <div className="mt-6 flex flex-col gap-5 text-sm text-white/50">

            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-white/30" />
              <span className="leading-relaxed">
                {HLB.address}
              </span>
            </div>

            {/* Phone */}
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 mt-0.5 text-white/30" />
              <span className="leading-relaxed">0326-0892858</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${HLB.email}`}
              className="flex items-start gap-4 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 mt-0.5 text-white/30" />
              <span className="leading-relaxed break-all">{HLB.email}</span>
            </a>

          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 lg:flex-row lg:px-10 lg:text-left">
          <span>© {new Date().getFullYear()} HLB Constructors — All Rights Reserved</span>
          <span className="text-[oklch(0.86_0.13_88)]/60">Design · Build · Deliver</span>
        </div>
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
        e.preventDefault();
        window.open(WA_HREF, "_blank", "noopener,noreferrer");
      }}
      className="group fixed bottom-6 right-6 z-[100] grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-[oklch(0.62_0.16_150)] text-[oklch(0.14_0.03_265)] shadow-[0_0_30px_-4px_oklch(0.62_0.16_150/0.6)] transition-transform duration-300 hover:scale-110 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[oklch(0.62_0.16_150)] opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-80"></span>
      <span className="absolute inset-0 rounded-full bg-[oklch(0.62_0.16_150)] animate-ping opacity-20"></span>

      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true" className="relative z-10">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.5h-.004a9.87 9.87 0 01-5.03-1.378l-.36-.214-3.744.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.897 9.821 9.821 0 012.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885zm8.413-18.297A11.815 11.815 0 0012.04 0C5.463 0 .11 5.35.108 11.926c0 2.096.549 4.14 1.594 5.945L0 24l6.335-1.652a11.876 11.876 0 005.7 1.448h.006c6.582 0 11.935-5.35 11.938-11.925a11.86 11.86 0 00-3.526-8.667z" />
      </svg>
    </a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="grain vignette relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-[oklch(0.78_0.15_85)] selection:text-[oklch(0.15_0.03_265)]">
      <ProgressBar />
      <SiteNav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
