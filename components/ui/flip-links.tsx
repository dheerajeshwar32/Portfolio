"use client";

import { motion } from "framer-motion";

export const FlipLinksSection = () => {
  return (
    <section className="grid place-content-center gap-2 bg-background px-8 py-24 text-foreground">
      <FlipLink href="https://github.com/dheerajeshwar32">GITHUB</FlipLink>
      <FlipLink href="https://www.linkedin.com/in/nagula-dheeraj-eshwar-b297a2320/">LINKEDIN</FlipLink>
      <FlipLink href="mailto:dheerajeshwarnagula@gmail.com">EMAIL</FlipLink>
      <FlipLink href="tel:+918688921945">PHONE</FlipLink>
      <FlipLink href="https://instagram.com/dheeraj_eshwar32">INSTAGRAM</FlipLink>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter"
      style={{ lineHeight: 0.85 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};