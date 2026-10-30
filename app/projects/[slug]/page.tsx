import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, CheckCircle2, Layers, Cpu, BarChart3, ShieldCheck } from "lucide-react";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects
    .filter((p) => p.hasCaseStudy)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;

  const project = projects.find(
    (p) => p.slug === resolvedParams.slug && p.hasCaseStudy
  );

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 selection:bg-foreground/10">
      {/* Top Header & Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Portfolio
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {project.tag && (
            <Badge className="rounded-full bg-secondary text-secondary-foreground px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
              {project.tag}
            </Badge>
          )}
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider px-2 py-0.5 rounded-md border border-border/60">
            Case Study
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
          {project.headline}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
          {project.excerpt}
        </p>

        {/* Action Buttons Header */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 active:scale-95 transition-all shadow-md"
            >
              <ExternalLink size={16} /> Visit Live Website
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/80 bg-card/60 text-sm font-medium text-foreground hover:bg-secondary active:scale-95 transition-all"
            >
              <Code2 size={16} /> View on GitHub
            </a>
          )}
        </div>
      </div>

      {/* Hero Visual */}
      {project.cover && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-border shadow-2xl bg-card">
            <Image
              src={project.cover}
              alt={project.headline}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        
        {/* Key Metrics Strip */}
        {caseStudy?.metrics && caseStudy.metrics.length > 0 && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caseStudy.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm flex flex-col justify-between"
              >
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  {metric.label}
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </span>
              </div>
            ))}
          </section>
        )}

        {/* Project Overview */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
            <Layers size={16} className="text-foreground/70" /> System Overview
          </div>
          <div className="p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-sm text-base sm:text-lg leading-relaxed text-muted-foreground/90 space-y-4">
            <p>{project.fullDescription}</p>
          </div>
        </section>

        {/* The Engineering Challenge */}
        {caseStudy?.challenge && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <Cpu size={16} className="text-foreground/70" /> The Engineering Challenge
            </div>
            <div className="p-8 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-sm text-base leading-relaxed text-muted-foreground space-y-3">
              <p>{caseStudy.challenge}</p>
            </div>
          </section>
        )}

        {/* System Architecture & Core Design */}
        {caseStudy?.architecture && caseStudy.architecture.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <ShieldCheck size={16} className="text-foreground/70" /> Architectural Design & Core Mechanisms
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {caseStudy.architecture.map((arch, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-border bg-card/50 hover:border-foreground/20 transition-colors flex flex-col justify-start"
                >
                  <h3 className="font-semibold text-base text-foreground mb-2.5 flex items-center gap-2">
                    <span className="text-xs font-mono text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                    {arch.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {arch.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Highlights */}
        {caseStudy?.technicalHighlights && caseStudy.technicalHighlights.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <BarChart3 size={16} className="text-foreground/70" /> Technical Highlights & Innovations
            </div>
            <div className="p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-sm">
              <ul className="space-y-4">
                {caseStudy.technicalHighlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <CheckCircle2 size={18} className="text-foreground/80 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Outcomes & Validation */}
        {caseStudy?.outcomes && caseStudy.outcomes.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <CheckCircle2 size={16} className="text-foreground/70" /> Outcomes & Validation
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {caseStudy.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-border bg-card/50 flex flex-col justify-between"
                >
                  <span className="text-xs font-mono text-muted-foreground/50 mb-3">0{i + 1}</span>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed font-medium">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technologies Grid */}
        <section className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-85 transition-opacity"
                >
                  <ExternalLink size={14} /> Live Website
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <Code2 size={14} /> View on GitHub
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
