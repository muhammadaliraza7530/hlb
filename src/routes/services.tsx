import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/data/hlb";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Civil Works, Turnkey & Construction Management | HLB Constructors" },
      { name: "description", content: "Civil Works (PEC C-4), Turnkey Project Execution and Construction Management by HLB Constructors — end-to-end delivery across Pakistan." },
      { property: "og:title", content: "Services — HLB Constructors" },
      { property: "og:description", content: "What we can offer — civil works, turnkey execution and construction management under one roof." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="relative pt-32 pb-8 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— Services We Offer</div>
            <h1 className="mt-4 font-display font-black leading-[0.95] tracking-tight text-[clamp(2.4rem,9vw,5.5rem)]">
              What can we <span className="gold-text">offer.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <div className="svc-card corner-frame grid gap-6 rounded-2xl border border-white/10 bg-[oklch(0.19_0.04_265)] p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
                  <div className="grid h-20 w-20 place-items-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #4a9fe0, #1b5f9c)" }}>
                    <Icon className="h-10 w-10 text-[oklch(0.98_0.005_250)]" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black sm:text-3xl">{s.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">{s.intro}</p>
                    <ul className="mt-5 grid gap-1.5 text-[13px] text-white/55 sm:grid-cols-2">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[oklch(0.72_0.12_245)]" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/contact"
                    className="justify-self-start rounded-full border border-[oklch(0.58_0.14_248)]/60 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[oklch(0.72_0.12_245)] hover:bg-[oklch(0.58_0.14_248)] hover:text-[oklch(0.98_0.005_250)] md:justify-self-end">
                    Enquire
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
