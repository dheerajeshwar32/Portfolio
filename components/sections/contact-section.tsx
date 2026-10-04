import { FadeIn, SectionLabel } from "@/components/ui/helpers";
import { FlipLinksSection } from "@/components/ui/flip-links";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-0 bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-6 text-center">
        <FadeIn><SectionLabel>Contact</SectionLabel></FadeIn>
      </div>
      <FlipLinksSection />
    </section>
  );
}
