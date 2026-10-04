import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  // Await the params object (Next.js 15 requires this)
  const resolvedParams = await params;
  
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Back Button & Header */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          {project.tag && (
            <Badge className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-sm font-medium">
              {project.tag}
            </Badge>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{project.headline}</h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed">
          {project.excerpt}
        </p>
      </div>

      {/* Hero Image */}
      {project.cover && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border shadow-2xl">
            <Image 
              src={project.cover} 
              alt={project.headline} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold max-w-none">
          <h2>Overview</h2>
          <p>{project.fullDescription}</p>
        </div>

        {/* Tools & Links */}
        <div className="mt-16 pt-8 border-t border-border grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map(tool => (
                <span key={tool} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity font-medium"
                >
                  <Github size={20} /> View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
