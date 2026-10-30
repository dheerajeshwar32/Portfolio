"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [internalActiveIndex, setInternalActiveIndex] = useState(0)
    const activeIndex = activeTab
      ? Math.max(0, tabs.findIndex((t) => t.id === activeTab))
      : internalActiveIndex
    const [hoverStyle, setHoverStyle] = useState({})
    const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
    const tabRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
      if (hoveredIndex !== null) {
        const hoveredElement = tabRefs.current[hoveredIndex]
        if (hoveredElement) {
          const { offsetLeft, offsetWidth } = hoveredElement
          setHoverStyle({ left: `${offsetLeft}px`, width: `${offsetWidth}px` })
        }
      }
    }, [hoveredIndex])

    useEffect(() => {
      const activeElement = tabRefs.current[activeIndex]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({ left: `${offsetLeft}px`, width: `${offsetWidth}px` })
      }
    }, [activeIndex])

    useEffect(() => {
      requestAnimationFrame(() => {
        const firstElement = tabRefs.current[0]
        if (firstElement) {
          const { offsetLeft, offsetWidth } = firstElement
          setActiveStyle({ left: `${offsetLeft}px`, width: `${offsetWidth}px` })
        }
      })
    }, [])

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="relative">
          <div
            className="absolute h-[30px] transition-all duration-300 ease-out bg-secondary rounded-[6px] flex items-center"
            style={{ ...hoverStyle, opacity: hoveredIndex !== null ? 1 : 0 }}
          />
          <div
            className="absolute bottom-[-6px] h-[2px] bg-foreground transition-all duration-300 ease-out"
            style={activeStyle}
          />
          <div className="relative flex space-x-[6px] items-center">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                ref={(el) => { tabRefs.current[index] = el }}
                className={cn(
                  "px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px]",
                  index === activeIndex
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground/80"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setInternalActiveIndex(index)
                  onTabChange?.(tab.id)
                }}
              >
                <div className="text-sm font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
                  {tab.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
Tabs.displayName = "Tabs"

export { Tabs }
