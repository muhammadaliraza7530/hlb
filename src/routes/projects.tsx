import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PROJECT_GALLERY } from "@/data/hlb";
import { celebrate } from "@/lib/confetti";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Dayany Heights, Safron Heights, Royal Homes | HLB Constructors" },
      { name: "description", content: "Selected completed projects by HLB Constructors — Dayany Heights, Safron Heights, Royal Homes, Royal Elite Homes, Mahran Twin Towers, Burj Al-Baraka." },
      { property: "og:title", content: "Projects — HLB Constructors" },
      { property: "og:description", content: "Selected residential, commercial and high-rise projects completed by High Land Builders & Constructors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECT_GALLERY)[number] | null>(null);

  return (
    <SiteShell>
      <section className="relative pt-32 pb-8 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.72_0.12_245)]">— Our Blog</div>
            <h1 className="mt-4 font-display font-black leading-[0.95] tracking-tight text-[clamp(2.4rem,9vw,5.5rem)]">
              Read our latest <span className="gold-text">projects.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_GALLERY.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.05}>
                <button
                  onClick={(e) => {
                    setSelectedProject(project);
                    celebrate(e.clientX, e.clientY);
                  }}
                  className="group relative block w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-[oklch(0.16_0.03_255)] text-left shadow-[0_22px_60px_-38px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[oklch(0.58_0.14_248)]/55 hover:shadow-[0_28px_90px_-34px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative overflow-hidden bg-[oklch(0.12_0.03_265)]">
                    <div className="aspect-[4/3] w-full bg-[oklch(0.12_0.03_265)]" />
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[oklch(0.72_0.12_245)] backdrop-blur-sm">
                      Gallery
                    </div>
                    <div className="mt-4 font-display text-xl font-black leading-tight text-white sm:text-2xl">
                      {project.title}
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {project.images.length} photos
                    </div>
                    <div className="mt-4 h-[2px] w-12 rounded-full bg-[oklch(0.58_0.14_248)] transition-all duration-500 ease-out" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-hidden border-white/10 bg-[oklch(0.12_0.03_265)] p-0 text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <DialogTitle className="text-white">{selectedProject?.title}</DialogTitle>
              <DialogDescription className="text-white/70">
                {selectedProject ? `${selectedProject.images.length} images in this gallery` : ""}
              </DialogDescription>
            </div>
          </div>
          <div className="max-h-[70vh] overflow-y-auto p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedProject?.images.map((image, index) => (
                <div key={`${selectedProject.title}-${index}`} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/20">
                  <img
                    src={image}
                    alt={`${selectedProject.title} image ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-64 w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}
