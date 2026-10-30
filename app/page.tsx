"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { 
  motion, 
  useReducedMotion,
  AnimatePresence
} from "motion/react";
import { spaceGrotesk } from "@/lib/fonts";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { MagneticButton, CustomCursor } from "@/components/ui/helpers";
import { Tabs } from "@/components/ui/vercel-tabs";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";
import { NAV_TABS } from "@/lib/data";
import { useTheme } from "next-themes";
import { Mail, ExternalLink, Moon, Sun, Link2, Menu, X, FileText } from "lucide-react";

/* ────────────────────────────────────────────────────────────── */
/* MAIN COMPONENT                                                 */
/* ────────────────────────────────────────────────────────────── */
export default function Home() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [navVisible, setNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative z-[1] min-h-screen text-foreground overflow-x-hidden">
      <CustomCursor />
      <DottedSurface />

      {/* ─── STICKY NAV ─── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navVisible || mobileMenuOpen
            ? "py-3 backdrop-blur-xl bg-background/80 border-b border-border shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className={`text-lg font-bold tracking-widest text-foreground hover:opacity-70 transition-opacity uppercase ${spaceGrotesk.className}`}
          >
            NDEP
          </button>
          
          {/* Desktop Nav */}
          <Tabs tabs={NAV_TABS} onTabChange={scrollTo} className="hidden md:block" />
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground hidden sm:block"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />) : <Sun className="opacity-0" size={16} />}
            </button>

            {/* Resume Button in Navbar */}
            <a
               href="https://drive.google.com/file/d/1AccOUocoGvDmdIH8JZUpgL4GlCVYrWsD/view?usp=sharing"
               target="_blank"
               rel="noopener noreferrer"
               className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/70 hover:bg-secondary transition-colors text-sm font-medium"
             >
               <FileText size={14} /> Resume
            </a>

            <MagneticButton>
              <button
                 onClick={() => scrollTo("contact")}
                 className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
               >
                 <Mail size={14} /> Hire Me
               </button>
            </MagneticButton>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="p-2 md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border mt-3 bg-background/95 backdrop-blur-xl"
            >
              <div className="flex flex-col py-4 px-6 gap-4">
                {NAV_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollTo(tab.id)}
                    className="text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                  >
                    {tab.label}
                  </button>
                ))}
                <div className="h-px bg-border my-2" />
                <a
                  href="https://drive.google.com/file/d/1AccOUocoGvDmdIH8JZUpgL4GlCVYrWsD/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground py-2 hover:text-foreground"
                >
                  <FileText size={16} /> Resume
                </a>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground py-2"
                >
                  {mounted ? (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />) : null}
                  Toggle Theme
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center px-6 pt-28 pb-20"
      >
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none opacity-0 dark:opacity-30 transition-opacity duration-700" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none opacity-0 dark:opacity-20 transition-opacity duration-700" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_70%_60%_at_40%_50%,rgba(0,0,0,0.45)_0%,transparent_100%)] transition-opacity duration-700" />

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 md:pl-16">
          
          {/* ── Left: Text ── */}
          <div className="text-center md:text-left flex-1 flex flex-col items-center md:items-start md:ml-8 lg:ml-16 mt-8 md:mt-0">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tighter leading-[1.05] mb-6 flex flex-col md:items-start items-center ${spaceGrotesk.className}`}>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="inline-block text-foreground"
              >
                Nagula Dheeraj
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40"
              >
                Eshwar Prudhvi
              </motion.span>
            </h1>

            {/* Glowing Tagline - Single Line Fix */}
            <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-mono text-muted-foreground/80 tracking-[0.15em] sm:tracking-[0.18em] uppercase mb-6 flex flex-nowrap whitespace-nowrap gap-1.5 sm:gap-2 md:gap-4 justify-center md:justify-start">
              {["Web Development", "Generative AI", "Cloud Computing"].map((item, index) => (
                <span key={item} className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
                  {index > 0 && <span className="opacity-40">·</span>}
                  <motion.span
                    animate={shouldReduceMotion ? {} : {
                      textShadow: [
                        "0px 0px 0px rgba(255,255,255,0)",
                        "0px 0px 20px rgba(255,255,255,1)",
                        "0px 0px 0px rgba(255,255,255,0)",
                      ],
                      opacity: [1, 1, 1],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 1,
                      ease: "easeInOut",
                    }}
                    className="font-bold relative z-10"
                  >
                    {item}
                  </motion.span>
                </span>
              ))}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-sm sm:text-base text-muted-foreground/90 max-w-lg mb-10 leading-relaxed md:mx-0 mx-auto"
            >
              B.Tech CSE student at VIT Vellore building full-stack web apps, GenAI-powered tools, and cloud-native systems — turning strong CS fundamentals into production-ready software.
            </motion.p>

            {/* 3 Perfect Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 relative z-20"
            >
              <MagneticButton>
                <button
                  onClick={() => scrollTo("projects")}
                  className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 active:scale-95 transition-all flex items-center gap-2 shadow-lg"
                >
                  View Projects <ExternalLink size={14} />
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://github.com/dheerajeshwar32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-border/70 bg-background/30 backdrop-blur-sm hover:bg-background/60 active:scale-95 transition-all flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/nagula-dheeraj-eshwar-b297a2320/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-border/70 bg-background/30 backdrop-blur-sm hover:bg-background/60 active:scale-95 transition-all flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Link2 size={14} /> LinkedIn
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex justify-center md:justify-center flex-1 relative z-10"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-foreground/50 to-foreground/10 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-b from-foreground/40 to-transparent" />

              <div className="relative size-40 sm:size-48 md:size-56 rounded-full overflow-hidden border border-border/30 shadow-2xl bg-transparent">
                {avatarError ? (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] text-[#f8f7f4] text-[3.5rem] font-bold ${spaceGrotesk.className}`}>
                    ND
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/avatar.png"
                    alt="Nagula Dheeraj Eshwar Prudhvi"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => setAvatarError(true)}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {!shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/40"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
            <motion.div
              animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-px h-10 bg-gradient-to-b from-muted-foreground/60 to-transparent origin-top"
            />
          </motion.div>
        )}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-8 px-6 text-center text-xs text-muted-foreground bg-background relative z-20">
        © {new Date().getFullYear()} Nagula Dheeraj Eshwar Prudhvi · Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
