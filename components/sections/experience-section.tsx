import { Space_Grotesk } from "next/font/google";
import { FadeIn, SectionLabel } from "@/components/ui/helpers";
import { experience } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <FadeIn><SectionLabel>Experience</SectionLabel></FadeIn>
        <FadeIn delay={0.1}><h2 className={`text-3xl sm:text-4xl font-bold mb-16 ${spaceGrotesk.className}`}>Where I&apos;ve been building</h2></FadeIn>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12 pl-12">
            {experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative group">
                  <div
                    className="absolute -left-[2.35rem] top-1.5 size-3 rounded-full border-2 border-background transition-transform group-hover:scale-125"
                    style={{ background: exp.accent }}
                  />
                  <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-foreground/20 transition-colors duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="text-muted-foreground text-sm">{exp.org} · {exp.location}</p>
                      </div>
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full border"
                        style={{ borderColor: exp.accent + "44", color: exp.accent }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((point, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-foreground/40 mt-1 shrink-0">›</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
