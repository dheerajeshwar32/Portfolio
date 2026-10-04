import { Mail } from "lucide-react";
import { FadeIn, SectionLabel } from "@/components/ui/helpers";
import { MagicText } from "@/components/ui/magic-text";

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <FadeIn><SectionLabel>About</SectionLabel></FadeIn>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <MagicText text="Bridging core computer science with modern web architecture to build fast, scalable, and intelligent applications." />
          </FadeIn>
          <FadeIn delay={0.25} className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a <strong className="text-foreground">B.Tech Computer Science &amp; Engineering (Core)</strong>{" "}
              student at <strong className="text-foreground">VIT Vellore</strong>, expecting to graduate in 2028.
            </p>
            <p>
              I thrive on translating a strong foundation in Data Structures, Algorithms, OS, and DBMS into real-world code. Beyond algorithms, I continuously explore modern web technologies—from React and WebAssembly to hardware integration and GenAI—to build highly functional, full-stack platforms like{" "}
              <strong className="text-foreground">PerfectByte</strong> and <strong className="text-foreground">healthOS</strong>.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="mailto:dheerajeshwarnagula@gmail.com"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity relative z-20"
              >
                <Mail size={14} /> dheerajeshwarnagula@gmail.com
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
