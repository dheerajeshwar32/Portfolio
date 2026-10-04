import { Space_Grotesk } from "next/font/google";
import { ExternalLink } from "lucide-react";
import { FadeIn, SectionLabel, SpotlightWrapper } from "@/components/ui/helpers";
import { certifications } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });

export function EducationSection() {
  return (
    <section className="relative py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <FadeIn><SectionLabel>Education</SectionLabel></FadeIn>
        <FadeIn delay={0.1}><h2 className={`text-3xl sm:text-4xl font-bold mb-16 ${spaceGrotesk.className}`}>Academic journey</h2></FadeIn>
        <div className="space-y-4">
          {[
            { school: "Vellore Institute of Technology (VIT)", degree: "B.Tech in Computer Science & Engineering (Core)", grade: "8.88 CGPA", period: "2024 - 2028", location: "Vellore, India", isPursuing: true },
            { school: "Sri Chaitanya Junior College", degree: "Intermediate (MPC)", grade: "94.6%", period: "Jun 2022 - May 2024", location: "Andhra Pradesh, India" },
            { school: "Aditya Talent School", degree: "Class X", grade: "93.33%", period: "May 2019 - Apr 2021", location: "Andhra Pradesh, India" },
          ].map((edu, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-card/60 border border-border hover:border-foreground/20 transition-colors">
                <div>
                  <h3 className="font-semibold">{edu.school}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree} · {edu.location}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  {edu.isPursuing && (
                    <span className="flex items-center gap-1.5 text-green-500 font-medium text-xs mb-1 uppercase tracking-wider">
                      <span className="size-1.5 rounded-full bg-green-500 animate-pulse" /> Pursuing
                    </span>
                  )}
                  <span className="font-semibold text-lg leading-none">{edu.grade}</span>
                  <span className="text-xs text-muted-foreground font-mono block mt-1.5">{edu.period}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-24">
          <FadeIn delay={0.2}>
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${spaceGrotesk.className}`}>📜 Licenses & Certifications</h3>
            <div className="grid sm:grid-cols-2 gap-4 relative z-20">
              {certifications.map((cert, i) => (
                <SpotlightWrapper key={i}>
                  {cert.url === "#" ? (
                    // Render as non-link div if verification is pending/missing URL
                    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card/60 border border-border transition-colors w-full h-full cursor-default">
                      <div className="flex justify-between items-start">
                        <span className="text-foreground/40 font-mono text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[10px] bg-secondary/80 text-muted-foreground px-2 py-0.5 rounded-full">Pending Link</span>
                      </div>
                      <span className="font-medium text-foreground">{cert.title}</span>
                      <span className="text-sm text-muted-foreground">{cert.org}</span>
                      <span className="text-xs text-muted-foreground/60 font-mono">{cert.id}</span>
                    </div>
                  ) : (
                    // Render as clickable link if URL exists
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2 p-5 rounded-2xl bg-card/60 border border-border transition-colors w-full h-full group">
                      <div className="flex justify-between items-start">
                        <span className="text-foreground/40 font-mono text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <span className="font-medium text-foreground">{cert.title}</span>
                      <span className="text-sm text-muted-foreground">{cert.org}</span>
                      <span className="text-xs text-muted-foreground/60 font-mono">{cert.id}</span>
                    </a>
                  )}
                </SpotlightWrapper>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
