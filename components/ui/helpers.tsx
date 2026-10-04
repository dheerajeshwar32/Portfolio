"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useInView, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate, 
  useReducedMotion 
} from "motion/react";

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] mb-4">
      {children}
    </p>
  );
}

// 1. Magnetic Physics Button (Optimized)
export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={shouldReduceMotion ? {} : { x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

// 2. Spotlight Hover Card Wrapper (Optimized)
export function SpotlightWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const opacity = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className="relative overflow-hidden rounded-2xl group w-full h-full"
    >
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
          style={{
            opacity,
            background: useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(255,255,255,.12), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

// 3. Ultra-Optimized Custom Physics Cursor
export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const shouldReduceMotion = useReducedMotion();
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || shouldReduceMotion) return;
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      
      const target = e.target as HTMLElement;
      const isPointer = !!target.closest('a, button, [role="button"]');
      setIsHovering(isPointer);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-blue-500/50 backdrop-blur-md border border-blue-400/50 pointer-events-none z-[999] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHovering ? 2.8 : 1,
      }}
    >
      <motion.div
        animate={{ opacity: isHovering ? 1 : 0 }}
        className="text-[3px] font-black text-white mix-blend-normal"
      >
        CLICK
      </motion.div>
    </motion.div>
  );
}
