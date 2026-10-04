import { Space_Grotesk } from "next/font/google";
import { FadeIn, SectionLabel, SpotlightWrapper } from "@/components/ui/helpers";
import { ArticleCard } from "@/components/ui/blog-post-card";
import { featuredProjects, otherProjects } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <FadeIn><SectionLabel>Projects</SectionLabel></FadeIn>
        
        {/* Featured Projects */}
        <FadeIn delay={0.1}><h2 className={`text-2xl sm:text-3xl font-bold mb-10 ${spaceGrotesk.className}`}>Featured Work</h2></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20 mb-20">
          {featuredProjects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.08} className="w-full">
              <SpotlightWrapper>
                <ArticleCard {...project} />
              </SpotlightWrapper>
            </FadeIn>
          ))}
        </div>

        {/* Other Projects */}
        <FadeIn delay={0.1}><h2 className={`text-2xl sm:text-3xl font-bold mb-10 text-muted-foreground ${spaceGrotesk.className}`}>Other Explorations</h2></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {otherProjects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.08} className="w-full opacity-90 hover:opacity-100 transition-opacity">
              <SpotlightWrapper>
                <ArticleCard {...project} />
              </SpotlightWrapper>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
