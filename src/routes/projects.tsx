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
                  className="group relative block w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-[oklch(0.14_0.03_265)] text-left shadow-[0_22px_60px_-38px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[oklch(0.78_0.15_85)]/55 hover:shadow-[0_28px_90px_-34px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative overflow-hidden bg-[oklch(0.12_0.03_265)]">
                    <div className="aspect-[4/3] w-full bg-[oklch(0.12_0.03_265)]" />
                    <img
                      src={p.img}
                      alt={p.alt ?? p.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[oklch(0.86_0.13_88)] backdrop-blur-sm">
                      {p.tag}
                    </div>
                    <div className="mt-4 font-display text-xl font-black leading-tight text-white sm:text-2xl">
                      {p.title}
                    </div>
                    <div className="mt-4 h-[2px] w-12 rounded-full bg-[oklch(0.78_0.15_85)] transition-all duration-500 ease-out" />
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
