"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X, ExternalLink } from "lucide-react";

export interface ArticleCardProps {
  slug?: string;
  hasCaseStudy?: boolean;
  headline: string;
  excerpt: string;
  fullDescription?: string;
  cover?: string;
  tag?: string;
  tools?: string[];
  githubUrl?: string;
  liveUrl?: string;
  clampLines?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  hasCaseStudy,
  cover,
  tag,
  githubUrl,
  liveUrl,
  headline,
  excerpt,
  fullDescription,
  tools,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const hasMeta = !!tag;
  const hasFooter = !!(githubUrl || liveUrl);

  return (
    <>
      <Card 
        onClick={() => setIsOpen(true)}
        className="flex w-full max-w-sm flex-col gap-3 overflow-hidden rounded-3xl border p-3 shadow-lg cursor-pointer hover:border-foreground/30 transition-colors h-full"
      >
        {cover && (
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={cover}
                alt={headline}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="rounded-2xl object-cover"
              />
            </div>
          </CardHeader>
        )}

        <CardContent className="flex-1 flex flex-col p-3">
          {hasMeta && (
            <div className="mb-4 flex items-center text-sm">
              {tag && (
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
                  {tag}
                </Badge>
              )}
            </div>
          )}

          <h2 className="mb-2 text-xl sm:text-2xl font-bold leading-tight text-card-foreground line-clamp-2 min-h-[3.5rem]">
            {headline}
          </h2>

          <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">
            {excerpt}
          </p>
        </CardContent>

        {hasFooter && (
          <CardFooter className="p-3 pt-0 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex p-2 rounded-full border bg-card hover:bg-muted transition-colors"
                aria-label="View on GitHub"
                title="View on GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-muted-foreground group-hover:text-foreground transition-colors">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex p-2 rounded-full border bg-card hover:bg-muted transition-colors"
                aria-label="Live Website"
                title="Live Website"
              >
                <ExternalLink className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            )}
          </CardFooter>
        )}
      </Card>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl z-10 flex flex-col max-h-[90vh]"
              >
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-colors"
                    aria-label="Close dialog"
                  >
                    <X size={20} />
                  </button>
                  
                  {cover && (
                    <div className="relative h-48 sm:h-64 w-full mb-6 rounded-2xl overflow-hidden">
                      <Image src={cover} alt={headline} fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {tag && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs sm:text-sm font-semibold">
                        {tag}
                      </Badge>
                    )}
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 active:scale-95 transition-all shadow-sm"
                      >
                        <ExternalLink size={14} />
                        <span>Live Website</span>
                      </a>
                    )}
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card hover:bg-secondary active:scale-95 transition-all shadow-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span>View on GitHub</span>
                      </a>
                    )}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-card-foreground">{headline}</h3>
                  
                  <div className="prose prose-sm md:prose-base dark:prose-invert text-muted-foreground mb-8">
                    <p>{fullDescription || excerpt}</p>
                  </div>
                  
                  {tools && tools.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {tools.map(tool => (
                          <span key={tool} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {hasCaseStudy && slug && (
                    <div className="mt-4 border-t border-border pt-6">
                      <Link href={`/projects/${slug}`} className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-md">
                        Read Full Case Study
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
