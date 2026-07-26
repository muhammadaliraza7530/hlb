import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS } from "@/data/hlb";
import { celebrate } from "@/lib/confetti";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Dayany Heights, Safron Heights, Royal Homes | HLB Constructions" },
      { name: "description", content: "Selected completed projects by HLB Constructions — Dayany Heights, Safron Heights, Royal Homes, Royal Elite Homes, Mahran Twin Towers, Burj Al-Baraka." },
      { property: "og:title", content: "Projects — HLB Constructions" },
      { property: "og:description", content: "Selected residential, commercial and high-rise projects completed by High Land Builders & Constructors." },
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
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.86_0.13_88)]">— Our Blog</div>
            <h1 className="mt-4 font-display font-black leading-[0.95] tracking-tight text-[clamp(2.4rem,9vw,5.5rem)]">
              Read our latest <span className="gold-text">projects.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <button
                  onClick={(e) => celebrate(e.clientX, e.clientY)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-[oklch(0.78_0.15_85)]/30 bg-[oklch(0.19_0.04_265)] text-left transition-shadow duration-500 hover:border-[oklch(0.78_0.15_85)]/70 hover:shadow-[0_0_40px_-6px_oklch(0.78_0.15_85/0.55)]"
                >
                  <div className="aspect-square w-full overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.08]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">{p.tag}</div>
                    <div className="mt-2 font-display text-lg leading-tight text-white sm:text-xl">{p.title}</div>
                    <div className="mt-3 h-px w-0 bg-[oklch(0.78_0.15_85)] transition-all duration-700 group-hover:w-16" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
