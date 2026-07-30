import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { Reveal } from "@/components/site/Reveal";
import { SiteShell } from "@/components/site/SiteShell";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { celebrate } from "@/lib/confetti";
import { ProjectsCarousel } from "@/components/site/ProjectsCarousel";
import { HLB, WA_HREF, PROJECTS, HERO_BG_IMAGES, SERVICES, PHILOSOPHY, PROCESS } from "@/data/hlb";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HLB Constructors — High-Rise, Turnkey & Construction Management in Pakistan" },
      { name: "description", content: "HLB Constructors (High Land Builders & Constructors) — since 1985. Civil works, turnkey execution and construction management for residential, commercial & government projects across Pakistan." },
      { property: "og:title", content: "HLB Constructors — Design · Build · Deliver" },
      { property: "og:description", content: "40+ years building Pakistan — Dayany Heights, Safron Heights, Royal Homes, Mahran Twin Towers, Burj Al-Baraka and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", as: "image", href: HERO_BG_IMAGES[0], fetchPriority: "high" },
    ],
  }),
});

function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [bgIdx, setBgIdx] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setBgIdx((i) => (i + 1) % HERO_BG_IMAGES.length), 6000);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMouse({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="top" ref={wrapRef} className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {HERO_BG_IMAGES.map((src, i) => {
          const isActive = i === bgIdx;
          return (
            <img key={src} src={src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: isActive ? 0.34 : 0,
                transform: isActive ? "scale(1.08)" : "scale(1.0)",
                transition: "opacity 2000ms ease-in-out, transform 7000ms ease-out",
                willChange: "opacity, transform",
              }} />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.16_0.03_255)]/60 via-[oklch(0.16_0.03_255)]/75 to-[oklch(0.16_0.03_255)]" />
      </div>
      <motion.div aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-[oklch(0.58_0.14_248)]/10 blur-3xl"
        animate={{ x: mouse.x * 20, y: mouse.y * 20 }} transition={{ type: "spring", damping: 20 }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-center text-[10px] font-bold uppercase text-[oklch(0.72_0.12_245)]/90 sm:mb-6 sm:text-xs"
        >
          — Welcome to HLB Constructors —
        </motion.p>
        <div className="relative overflow-hidden py-1">
          <motion.h1
            initial={{ opacity: 0, x: -120, filter: "blur(14px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="text-center font-display font-black leading-[0.9] tracking-tight text-[clamp(3.4rem,15vw,12rem)]"
          >
            <span className="hk-title-shimmer">HLB</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 120, filter: "blur(14px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="mt-3 text-center font-display font-semibold leading-[0.95] tracking-[0.22em] text-white/85 text-[clamp(0.9rem,3.6vw,2.4rem)]"
          >
            <span className="mr-2 text-[oklch(0.72_0.12_245)]">&amp;</span>Constructors
          </motion.div>
        </div>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[oklch(0.72_0.12_245)] to-transparent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
          High Land Builders &amp; Constructors — established in 1985 by
          Tanveer Ishtiaq Khan. Over three decades of trusted civil works,
          turnkey execution and construction management across Pakistan.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
          <Link to="/projects"
            className="rounded-full bg-[oklch(0.58_0.14_248)] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.98_0.005_250)]">
            View Our Work
          </Link>
          <Link to="/contact"
            className="rounded-full border border-white/20 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/80 hover:border-[oklch(0.58_0.14_248)] hover:text-[oklch(0.72_0.12_245)]">
            Start a Project
          </Link>
        </div>
        <div className="mt-8 sm:mt-10 md:mt-14">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const line = ["Civil Works", "High-Rise", "Turnkey", "Residential", "Commercial", "Management", "PEC C-4", "Since 1985"];
  const doubled = [...line, ...line, ...line];
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4 sm:py-6">
      <div className="marquee flex gap-8 whitespace-nowrap sm:gap-12">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-xl font-black text-white/40 sm:gap-12 sm:text-3xl md:text-5xl">
            {t}
            <span className="text-[oklch(0.58_0.14_248)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const stats = [
    { n: 40, suffix: "+", l: "Years of Practice" },
    { n: 100, suffix: "+", l: "Projects Delivered" },
    { n: 1000, suffix: "+", l: "Knowledge Asset" },
    { n: 40, suffix: "+", l: "Engineers on Team" },
  ];
  return (
    <section id="story" className="relative overflow-hidden py-20 md:py-40">
      <div ref={ref}>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— About Company</div>
            <h2 className="mt-6 font-display text-[clamp(1.6rem,7vw,3.75rem)] leading-[1.05] tracking-tight">
              Our philosophy in simply
              <br />
              <span className="gold-text font-black">and quality design.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60 sm:mt-8 sm:text-base">
              A leading construction company originally known as High Land Builders
              &amp; Constructors, established in 1985 by Tanveer Ishtiaq Khan — its
              sole entrepreneur, and managed and controlled by him.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
              With over 100 completed projects — including industrial, commercial
              and residential — we combine experience, a talented engineering team
              and disciplined execution to deliver work that lasts.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
              {stats.map((s) => (
                <div key={s.l} className="corner-frame rounded-xl border border-[oklch(0.58_0.14_248)]/30 bg-white/[0.02] p-4">
                  <div className="font-display text-4xl gold-text">
                    <AnimatedCounter value={s.n} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/50">{s.l}</div>
                </div>
              ))}
            </div>

          </Reveal>
          <Reveal delay={0.15} className="relative">
            <motion.div style={{ y }} className="corner-frame relative overflow-hidden rounded-3xl border border-[oklch(0.58_0.14_248)]/40 bg-[oklch(0.19_0.04_265)]">
<div className="flex flex-col sm:grid sm:grid-cols-[minmax(0,240px)_1fr]">
  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[oklch(0.24_0.04_265)] sm:aspect-auto sm:h-full">
                  <img
                    src="/hlb/ceo-portrait.jpg"
                    alt="Tanveer Ishtiaq Khan — Founder & CEO"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
                   className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[oklch(0.72_0.12_245)]">Founder &amp; CEO</div>
                  <h3 className="mt-3 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
                    Tanveer Ishtiaq Khan
                  </h3>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/40">Since 1985 · PEC C-4</div>
                  <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-[15px]">
                    &ldquo;For four decades, we have built with a single promise —
                    every structure must stand as proof of our word. At HLB, quality,
                    safety and on-time delivery are non-negotiable.&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-[oklch(0.72_0.12_245)]/60 to-transparent" />
                    <span className="font-display text-xs italic text-[oklch(0.72_0.12_245)]">— T. I. Khan</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— Services We Offer</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,7.5vw,3.75rem)] leading-[1.05]">
            What we can offer,
            <br />
            <span className="gold-text font-black">under one roof.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i * 0.08}>
                <div className="svc-card corner-frame group h-full rounded-2xl border border-white/10 bg-[oklch(0.19_0.04_265)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[oklch(0.58_0.14_248)]/60">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #4a9fe0, #1b5f9c)" }}>
                    <Icon className="h-8 w-8 text-[oklch(0.98_0.005_250)]" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-black sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.intro}</p>
                  <ul className="mt-5 space-y-1.5 text-[13px] text-white/55">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[oklch(0.72_0.12_245)]" /> {h}
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="mt-6 inline-block gold-link text-[11px] font-bold uppercase tracking-[0.28em] text-[oklch(0.72_0.12_245)]">
                    Read More →
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function Philosophy() {
  const items = [
    { title: "Vision", body: PHILOSOPHY.vision },
    { title: "Mission", body: PHILOSOPHY.mission },
    { title: "Our Values", body: PHILOSOPHY.values },
  ];
  return (
    <section className="section-light relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.45_0.13_252)]">— Our Benefits</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,7.5vw,3.75rem)] leading-[1.05]">
            Ambitious studio with a
            <br />
            <span className="font-black text-[oklch(0.55_0.15_78)]">successful concept &amp; ideas.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="light-card corner-frame h-full rounded-2xl p-8 transition hover:-translate-y-1">
                <div className="font-display text-[10px] uppercase tracking-[0.4em] text-[oklch(0.45_0.13_252)]">0{i + 1}</div>
                <h3 className="mt-4 font-display text-2xl font-black">{it.title}</h3>
                <p className="soft-ink mt-4 text-sm leading-relaxed">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function Work() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— Our Portfolio</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,7.5vw,3.75rem)] leading-[1.05]">
            Structures that <span className="gold-text font-black">endure.</span>
          </h2>
        </Reveal>
      </div>
      <div className="mx-auto mt-10 max-w-[100vw] px-2 sm:px-4">
        <ProjectsCarousel projects={PROJECTS} />
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section-light relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.45_0.13_252)]">— How We Work</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,7.5vw,3.75rem)] leading-[1.05]">
            From concept to <span className="font-black text-[oklch(0.55_0.15_78)]">handover.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="light-card corner-frame relative h-full rounded-2xl p-7 transition hover:-translate-y-1">
                <div className="font-display text-6xl font-black text-[oklch(0.45_0.13_252)]/25">{p.n}</div>
                <h3 className="mt-3 font-display text-lg font-black">{p.title}</h3>
                <p className="soft-ink mt-3 text-sm leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-40">
      <div className="spotlight pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— Let's Build</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,8.5vw,5.5rem)] leading-[0.95]">
            Have a site,<br /><span className="gold-text font-black">a plan, a vision?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/60 sm:text-base">
            {HLB.full} — {HLB.category} Reach out and let's     discuss your next project.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
              onClick={(e) => celebrate(e.clientX, e.clientY)}
              className="rounded-full bg-[oklch(0.58_0.14_248)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.98_0.005_250)]">
              WhatsApp Us
            </a>
            <Link to="/contact" className="rounded-full border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white/80 hover:border-[oklch(0.58_0.14_248)] hover:text-[oklch(0.72_0.12_245)]">
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <Story />
      <Services />
      <Philosophy />
      <Work />
      <Process />
      <CTA />
    </SiteShell>
  );
}
