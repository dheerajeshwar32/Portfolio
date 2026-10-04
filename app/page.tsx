"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  motion, 
  useInView, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate, 
  useReducedMotion,
  AnimatePresence
} from "motion/react";
import { Space_Grotesk } from "next/font/google";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { FadeIn, SectionLabel, MagneticButton, SpotlightWrapper, CustomCursor } from "@/components/ui/helpers";
import { MagicText } from "@/components/ui/magic-text";
import { FlipLinksSection } from "@/components/ui/flip-links";
import { Tabs } from "@/components/ui/vercel-tabs";
import { ArticleCard } from "@/components/ui/blog-post-card";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";
import { useTheme } from "next-themes";
import { Code2, Mail, ExternalLink, Moon, Sun, Link2, Menu, X, FileText } from "lucide-react";

// Load Premium Display Font
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });

/* ────────────────────────────────────────────────────────────── */
/* DATA                                                           */
/* ────────────────────────────────────────────────────────────── */

const NAV_TABS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    headline: "PerfectByte — Local-First File Compression",
    excerpt: "Privacy-first toolkit that compresses images and PDFs to an exact target byte size, entirely on-device.",
    fullDescription: "A privacy-first file utility that compresses images and PDFs down to an exact target byte size using a custom binary-search algorithm, with bulk folder compression powered by a Web Worker pool so the UI never blocks.",
    tools: ["React", "WebAssembly", "Tailwind CSS", "Web Workers", "Gemini API"],
    cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    tag: "Web Architecture",
    githubUrl: "https://perfectbyte.vercel.app/"
  },
  {
    headline: "CarbonRoute — Carbon-Aware LLM Router",
    excerpt: "Routes LLM inference requests based on live carbon intensity, latency, and cost SLA weights.",
    fullDescription: "An inference router that decides where to send an LLM request based on live carbon intensity, latency, and cost-priority weights. Targets a sub-200ms latency SLA while balancing cost and carbon-intensity.",
    tools: ["React", "Node.js", "Upstash Redis", "Tailwind CSS"],
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tag: "Systems / Edge Compute",
    githubUrl: "https://github.com/dheerajeshwar32/CarbonRoute"
  },
  {
    headline: "KYC — In-Browser Job-Skill Matching",
    excerpt: "Privacy-first job-skill matching PWA with an AI career coach, built for InnoHack 2.0.",
    fullDescription: "Matches candidates to jobs using Transformers.js for in-browser semantic skill-matching via client-side cosine similarity. Validated at 100% top-match domain accuracy. Ships as an offline-capable PWA.",
    tools: ["Transformers.js", "Gemini API", "Firebase", "React"],
    cover: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800&q=80",
    tag: "AI / Web Development",
    githubUrl: "https://code-perfect-innohack.vercel.app/"
  },
  {
    headline: "healthOS Digital Dashboard",
    excerpt: "Web-based digital healthcare dashboard featuring Web Speech API voice logging and live metrics.",
    fullDescription: "Developed healthOS, a comprehensive web-based digital healthcare dashboard. Integrated Web Speech API for seamless, accessible voice logging and utilized Chart.js for rendering dynamic, real-time data visualizations.",
    tools: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Web Speech API"],
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tag: "Frontend Application",
    githubUrl: "https://dheerajeshwar32.github.io/healthOS/"
  },
  {
    headline: "Smart City Traffic Analytics (MPMC)",
    excerpt: "Arduino-based hardware prototype for multi-lane adaptive signal control.",
    fullDescription: "Engineered the C++ logic for multi-lane timing, handled circuit wiring, and implemented precise microcontroller hardware timer configurations for synchronous signal switching without thread blocking.",
    tools: ["Arduino", "C++", "Microcontrollers", "Hardware Architecture"],
    cover: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
    tag: "Hardware / Core Systems",
    githubUrl: "https://github.com/dheerajeshwar32"
  },
  {
    headline: "Edge-Cloud Inference Scheduler",
    excerpt: "Java-based algorithms for collaborative inference scheduling built for the ICPC Challenge.",
    fullDescription: "Iteratively optimized Java solutions for the edge-cloud collaborative scheduling problem during the ICPC Challenge powered by Huawei. Focused on low-latency resource allocation algorithms.",
    tools: ["Java", "Data Structures", "Algorithm Design"],
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tag: "Algorithms",
    githubUrl: "https://github.com/dheerajeshwar32"
  }
];

const featuredProjects = projects.slice(0, 3);
const otherProjects = projects.slice(3);

const skills: Record<string, string[]> = {
  Languages: ["JavaScript", "TypeScript", "C", "C++", "SQL", "Java", "Python"],
  "Frameworks & Libraries": ["React", "Next.js", "Tailwind CSS", "Node.js"],
  "Core CS Subjects": ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks", "TOC"],
  "Systems & Performance": ["WebAssembly", "Microcontrollers (Arduino)", "Edge Compute", "Web Workers"],
  "AI & Cloud": ["OCI Generative AI", "Gemini API", "Transformers.js", "Prompt Engineering"],
  "Tools & Platforms": ["Git & GitHub", "Vercel", "Firebase", "Chart.js"],
};

const experience = [
  {
    role: "Web Development Intern",
    org: "NETMAXIN GROUP",
    period: "Sep 2026 - Present",
    location: "Remote",
    points: [
      "Developing responsive and interactive web applications as part of a remote engineering team.",
      "Utilizing modern frontend frameworks to build scalable user interfaces and improve client-side performance.",
    ],
    accent: "#f59e0b",
  },
  {
    role: "Hackathon Participant (AI & ML Track)",
    org: "InnoHack 2.0 — VIT Vellore",
    period: "Aug 2026",
    location: "Vellore, India",
    points: [
      "Built KYC, an offline in-browser AI job-skill matching application.",
      "Implemented in-browser semantic skill-matching with Transformers.js and client-side cosine similarity.",
      "Added an AI career coach using the Gemini API to generate personalized learning roadmaps.",
    ],
    accent: "#3b82f6",
  },
];

const certifications = [
  { title: "OCI 2025 Certified Generative AI Professional", org: "Oracle", id: "ID: 329728285OCI25GAIOCP", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7B2126EC6B5F86CE8B7B468F5845A682E7195E9FDEC54299A5C8D6F553258C29" },
  { title: "Deloitte Technology Job Simulation", org: "Forage", id: "ID: uoD2eFweqoHbeQne8", url: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_6a3f35a39bd7724d459ee4d6_1782549561128_completion_certificate.pdf" },
  { title: "Software Test Engineer Certificate", org: "MSDE Skill India & NASSCOM", id: "Issued: Jul 2026", url: "https://skill-india-dev.s3.ap-south-1.amazonaws.com/certificate_generic/uploaded_elements/2026071403084459/certificate_5c5ad779-6513-4b77-aee9-18e061cd3be2.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260915T151533Z&X-Amz-SignedHeaders=host&X-Amz-Expires=2000&X-Amz-Credential=AKIA3OJCFBJTPLAN4OGU%2F20260915%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=a904cdbe9728d0109cfaf92e524160fe888d29d21dfcce602e8d23d7ee2f2520" },
  { title: "INNOHACK 2.0 Certificate of Participation", org: "Institution's Innovation Council, VIT Vellore", id: "ID: INOHAC260004441", url: "https://innovation-vit-innohack-participants.web.app/verify/INOHAC260004441.4bdb2a7e923ed9b7" },
];


/* ────────────────────────────────────────────────────────────── */
/* MAIN COMPONENT                                                 */
/* ────────────────────────────────────────────────────────────── */
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

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
                  <Code2 size={14} /> GitHub
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
