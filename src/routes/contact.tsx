import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { HLB, WA_HREF } from "@/data/hlb";
import { celebrate } from "@/lib/confetti";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact HLB Constructions — Karachi, Pakistan" },
      { name: "description", content: "Contact HLB Constructions (High Land Builders & Constructors) — Karachi office, phone, email and enquiry form." },
      { property: "og:title", content: "Contact HLB Constructions" },
      { property: "og:description", content: "Let's start a project. Office in Karachi — call, email or WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="relative pt-32 pb-8 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.86_0.13_88)]">— Contacts</div>
            <h1 className="mt-4 font-display font-black leading-[0.95] tracking-tight text-[clamp(2.4rem,9vw,5.5rem)]">
              Let's start a <span className="gold-text">project.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="corner-frame rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h2 className="font-display text-2xl font-black">Get in Touch</h2>
              <p className="mt-2 text-sm text-white/60">Your email address will not be published. Required fields are marked *</p>

              <form className="mt-6 space-y-4"
                onSubmit={(e) => { e.preventDefault(); setSent(true); celebrate(e.currentTarget.getBoundingClientRect().left + 100, e.currentTarget.getBoundingClientRect().top + 50); }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Name *" className="w-full rounded-lg border border-white/10 bg-[oklch(0.19_0.04_265)] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[oklch(0.78_0.15_85)] focus:outline-none" />
                  <input required type="email" placeholder="Email *" className="w-full rounded-lg border border-white/10 bg-[oklch(0.19_0.04_265)] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[oklch(0.78_0.15_85)] focus:outline-none" />
                </div>
                <input placeholder="Subject" className="w-full rounded-lg border border-white/10 bg-[oklch(0.19_0.04_265)] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[oklch(0.78_0.15_85)] focus:outline-none" />
                <textarea required rows={5} placeholder="Message *" className="w-full rounded-lg border border-white/10 bg-[oklch(0.19_0.04_265)] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[oklch(0.78_0.15_85)] focus:outline-none" />
                <button type="submit"
                  className="rounded-full bg-[oklch(0.78_0.15_85)] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.15_0.03_265)] transition hover:scale-[1.02]">
                  Send Message
                </button>
                {sent && <div className="text-sm text-[oklch(0.86_0.13_88)]">Thanks — we'll reach out shortly.</div>}
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5">
              <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.86_0.13_88)]">— Our Contact Details</div>
              <h2 className="font-display text-3xl font-black sm:text-4xl">Reach us directly.</h2>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <MapPin className="mt-1 h-5 w-5 text-[oklch(0.86_0.13_88)]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">Our Address</div>
                    <div className="mt-1 text-sm text-white/70">{HLB.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <Mail className="mt-1 h-5 w-5 text-[oklch(0.86_0.13_88)]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">Our Mailbox</div>
                    <a href={`mailto:${HLB.email}`} className="mt-1 block text-sm text-white/70 hover:text-[oklch(0.86_0.13_88)]">{HLB.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <Phone className="mt-1 h-5 w-5 text-[oklch(0.86_0.13_88)]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">Our Phone</div>
                    <a href={`tel:${HLB.phone1}`} className="mt-1 block text-sm text-white/70 hover:text-[oklch(0.86_0.13_88)]">{HLB.phone1}</a>
                    <a href={`tel:${HLB.phone2}`} className="block text-sm text-white/70 hover:text-[oklch(0.86_0.13_88)]">{HLB.phone2}</a>
                  </div>
                </div>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                  className="block rounded-full bg-[oklch(0.62_0.16_150)] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.15_0.03_265)] hover:scale-[1.02] transition">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
