import { Space_Grotesk } from "next/font/google";
import { FadeIn, SectionLabel } from "@/components/ui/helpers";
import { skills } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <FadeIn><SectionLabel>Skills</SectionLabel></FadeIn>
        <FadeIn delay={0.1}><h2 className={`text-3xl sm:text-4xl font-bold mb-16 ${spaceGrotesk.className}`}>My technical toolkit</h2></FadeIn>
        <div className="grid sm:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], ci) => (
            <FadeIn key={category} delay={ci * 0.1}>
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, si) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm border border-border bg-card/60 text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
