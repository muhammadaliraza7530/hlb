import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { HLB, PHILOSOPHY } from "@/data/hlb";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HLB Constructors — Since 1985 | High Land Builders & Constructors" },
      { name: "description", content: "About HLB Constructors — founded 1985 by Tanveer Ishtiaq Khan. 40+ years of civil works, high-rise and construction management across Pakistan." },
      { property: "og:title", content: "About HLB Constructors — Since 1985" },
      { property: "og:description", content: "A message from Founder & CEO Tanveer Ishtiaq Khan and the story of High Land Builders & Constructors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const stats = [
    { n: 40, suffix: "+", l: "Years" },
    { n: 100, suffix: "+", l: "Projects" },
    { n: 1000, suffix: "+", l: "People" },
    { n: 800, suffix: "+", l: "Site Workers" },
  ];
  return (
    <SiteShell>
      <section className="relative pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— About Us</div>
            <h1 className="mt-4 font-display font-black leading-[0.95] tracking-tight text-[clamp(2.4rem,9vw,5.5rem)]">
              Building trust that <span className="gold-text">never shakes down.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-5 md:gap-16">
          <Reveal className="md:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-[oklch(0.58_0.14_248)]/40 bg-white/[0.02] p-8">
              <img src="/hlb/ceo-portrait.jpg" alt="Tanveer Ishtiaq Khan — Founder & CEO"
                className="mx-auto h-auto w-full max-w-[300px] object-contain" />
              <div className="mt-6 text-center">
                <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.72_0.12_245)]">Founder &amp; CEO</div>
                <div className="mt-2 font-display text-2xl font-black">TANVEER ISHTIAQ KHAN</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— Message from the Founder</div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">A word from our CEO.</h2>
            <p className="mt-6 text-white/70 leading-relaxed">
              With over 35 years of remarkable achievements and accomplishments, we are
              now trying to expand our business in the International Market as well as
              focusing on a variety of mammoth projects — especially in High-Rise
              Residential &amp; Commercial Buildings.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              With our experienced and skilled workforce, engineers, and technicians on
              our projects — and a vast range of reliable resources — we will earn our
              place in the Construction Industry in the years to come.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              World-class value-driven engineering and production — HighLand Builders
              &amp; Constructors touches the lives of many by making a difference and
              building trust that never shakes down. The Company has a knowledge asset
              of over 1,000 people, including a talent pool of about 40 engineers, and
              is a downstream employer of more than 800 workers at company project
              sites across Pakistan.
            </p>
            <p className="mt-6 font-display text-lg text-[oklch(0.72_0.12_245)]">We believe in our men.</p>
            <p className="mt-2 text-sm text-white/50">— Yours sincerely, Tanveer Ishtiaq Khan · Founder &amp; CEO</p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— About Us</div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">Three decades of building Pakistan.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-white/70 leading-relaxed">
              A leading construction company originally known as High Land Builders
              &amp; Constructors, established in 1985 by Tanveer Ishtiaq Khan — its
              sole entrepreneur — and managed and controlled by him. The company has
              been engaged in the construction business for over three decades and
              has witnessed continuous growth during this time. With our company
              based in Karachi — the financial hub of Pakistan — we now have our
              footprints across the country, demonstrating our commitment to our
              clients.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((s) => (
              <div key={s.l} className="rounded-xl border border-[oklch(0.58_0.14_248)]/30 bg-white/[0.02] p-5 text-center">
                <div className="font-display text-4xl gold-text sm:text-5xl">
                  <AnimatedCounter value={s.n} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {[
            { title: "Vision", body: PHILOSOPHY.vision },
            { title: "Mission", body: PHILOSOPHY.mission },
            { title: "Our Values", body: PHILOSOPHY.values },
          ].map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="corner-frame h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.72_0.12_245)]">0{i + 1}</div>
                <h3 className="mt-3 font-display text-2xl font-black">{it.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact"
            className="inline-block rounded-full bg-[oklch(0.58_0.14_248)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.98_0.005_250)]">
            Work With {HLB.brand}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
