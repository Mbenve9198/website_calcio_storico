"use client"
import type React from "react"
import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { BookingDialog } from "@/components/booking-dialog"

/* =========================
   Types
========================= */

type Source = { mp4?: string; webm?: string; ogg?: string }
type VideoLike = string | Source

type Eases = {
  container?: string // e.g. "expo.out"
  overlay?: string // e.g. "expo.out"
  text?: string // e.g. "power3.inOut"
}

export type HeroScrollVideoProps = {
  // Top headline area
  title?: ReactNode
  subtitle?: ReactNode
  meta?: ReactNode // e.g., date or small label
  credits?: ReactNode

  // Media
  media?: VideoLike // string URL or {mp4, webm, ogg}
  poster?: string
  mediaType?: "video" | "image" | "youtube"
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  autoPlay?: boolean

  // Overlay content (shown over sticky media on scroll)
  overlay?: {
    caption?: ReactNode
    heading?: ReactNode
    paragraphs?: ReactNode[]
    extra?: ReactNode // slot for buttons, links, etc.
  }

  // Layout and animation tuning
  initialBoxSize?: number // px, starting square size (default 360)
  targetSize?: { widthVw: number; heightVh: number; borderRadius?: number } | "fullscreen"
  scrollHeightVh?: number // total scroll height for sticky section (default 280)
  showHeroExitAnimation?: boolean // headline roll-away (default true)
  sticky?: boolean // keep media sticky (default true)
  overlayBlur?: number // px blur for overlay content at start (default 10)
  overlayRevealDelay?: number // seconds offset inside main timeline (default 0.35)
  eases?: Eases

  // Smooth scrolling
  smoothScroll?: boolean // initialize Lenis (default true)
  lenisOptions?: Record<string, unknown>

  className?: string
  style?: CSSProperties
}

/* =========================
   Defaults
========================= */

const DEFAULTS = {
  initialBoxSize: 360,
  targetSize: "fullscreen" as const,
  scrollHeightVh: 280,
  overlayBlur: 10,
  overlayRevealDelay: 0.35,
  eases: {
    container: "expo.out",
    overlay: "expo.out",
    text: "power3.inOut",
  } as Eases,
}

/* =========================
   Helpers
========================= */

function isSourceObject(m?: VideoLike): m is Source {
  return !!m && typeof m !== "string"
}

/* =========================
   Component
========================= */

export const HeroScrollVideo: React.FC<HeroScrollVideoProps> = ({
  title = "Future Forms",
  subtitle = "Design in Motion",
  meta = "2025",
  credits = <></>,

  media,
  poster,
  mediaType = "video",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = false,

  overlay = {
    caption: "PROJECT • 07",
    heading: "Clarity in Motion",
    paragraphs: [
      "Scroll to expand the frame and reveal the story.",
      "Built with GSAP ScrollTrigger and optional Lenis smooth scroll.",
    ],
    extra: null,
  },

  initialBoxSize = DEFAULTS.initialBoxSize,
  targetSize = DEFAULTS.targetSize,
  scrollHeightVh = DEFAULTS.scrollHeightVh,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,

  smoothScroll = true,
  lenisOptions,

  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headlineRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const overlayContentRef = useRef<HTMLDivElement | null>(null)

  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const isClient = typeof window !== "undefined"

  // Inline CSS variables for tuning (non-theme)
  const cssVars: CSSProperties = useMemo(
    () => ({
      ["--initial-size" as any]: `${initialBoxSize}px`,
      ["--overlay-blur" as any]: `${overlayBlur}px`,
    }),
    [initialBoxSize, overlayBlur],
  )

  // Scroll + GSAP wiring
  useEffect(() => {
    if (!isClient) return

    let gsap: any
    let ScrollTrigger: any
    let CustomEase: any
    let LenisCtor: any
    let lenis: any

    let heroTl: any
    let mainTl: any
    let overlayDarkenEl: HTMLDivElement | null = null

    let rafCb: ((t: number) => void) | null = null

    let cancelled = false
    ;(async () => {
      try {
        const gsapPkg = await import("gsap")
        gsap = gsapPkg.gsap || gsapPkg.default || gsapPkg

        const ScrollTriggerPkg =
          (await import("gsap/ScrollTrigger").catch(() => import("gsap/dist/ScrollTrigger"))) || {}
        ScrollTrigger = ScrollTriggerPkg.default || (ScrollTriggerPkg as any).ScrollTrigger || ScrollTriggerPkg

        const CustomEasePkg = (await import("gsap/CustomEase").catch(() => import("gsap/dist/CustomEase"))) || {}
        CustomEase = CustomEasePkg.default || (CustomEasePkg as any).CustomEase || CustomEasePkg

        gsap.registerPlugin(ScrollTrigger, CustomEase)

        if (cancelled) return

        if (smoothScroll) {
          const try1 = await import("@studio-freight/lenis").catch(() => null)
          const try2 = try1 || (await import("lenis").catch(() => null))
          LenisCtor = try2?.default || (try2 as any)?.Lenis
          if (LenisCtor) {
            lenis = new LenisCtor({
              duration: 0.8,
              smoothWheel: true,
              gestureOrientation: "vertical",
              ...lenisOptions,
            })
            rafCb = (time: number) => lenis?.raf(time * 1000)
            gsap.ticker.add(rafCb)
            gsap.ticker.lagSmoothing(0)
            lenis?.on?.("scroll", ScrollTrigger.update)
          }
        }

        const containerEase = eases.container ?? "expo.out"
        const overlayEase = eases.overlay ?? "expo.out"
        const textEase = eases.text ?? "power3.inOut"

        const container = containerRef.current!
        const overlayEl = overlayRef.current!
        const overlayContent = overlayContentRef.current!
        const headline = headlineRef.current!

        // Darkening overlay inside the media box
        if (container) {
          overlayDarkenEl = document.createElement("div")
          overlayDarkenEl.setAttribute("data-auto-darken", "true")
          overlayDarkenEl.style.position = "absolute"
          overlayDarkenEl.style.inset = "0"
          overlayDarkenEl.style.background = "rgba(0,0,0,0)"
          overlayDarkenEl.style.pointerEvents = "none"
          overlayDarkenEl.style.zIndex = "1"
          container.appendChild(overlayDarkenEl)
        }

        // Headline roll-away
        if (showHeroExitAnimation && headline) {
          heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: headline,
              start: "top top",
              end: "top+=420 top",
              scrub: 1.1,
            },
          })

          headline.querySelectorAll<HTMLElement>(".hsv-headline > *").forEach((el, i) => {
            heroTl.to(
              el,
              {
                rotationX: 80,
                y: -36,
                scale: 0.86,
                opacity: 0,
                filter: "blur(4px)",
                transformOrigin: "center top",
                ease: textEase,
              },
              i * 0.08,
            )
          })
        }

        // Main sticky expansion timeline
        const triggerEl = rootRef.current?.querySelector("[data-sticky-scroll]") as HTMLElement

        if (!triggerEl || !container || !overlayEl) return

        mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        })

        // Target size
        const target = (() => {
          if (targetSize === "fullscreen") {
            return { width: "92vw", height: "92vh", borderRadius: 0 }
          }
          return {
            width: `${targetSize.widthVw ?? 92}vw`,
            height: `${targetSize.heightVh ?? 92}vh`,
            borderRadius: targetSize.borderRadius ?? 0,
          }
        })()

        // Initial states
        gsap.set(container, {
          width: initialBoxSize,
          height: initialBoxSize,
          borderRadius: 20,
          filter: "none",
          clipPath: "inset(0 0 0 0)",
        })
        gsap.set(overlayEl, { clipPath: "inset(100% 0 0 0)" })
        gsap.set(overlayContent, {
          filter: `blur(var(--overlay-blur))`,
          scale: 1.05,
        })
        gsap.set([overlayContent], { y: 30 })

        // Animate the container to expand
        mainTl
          .to(
            container,
            {
              width: target.width,
              height: target.height,
              borderRadius: target.borderRadius,
              ease: containerEase,
            },
            0,
          )
          // Darken as it expands
          .to(
            overlayDarkenEl,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              ease: "power2.out",
            },
            0,
          )
          // Reveal overlay panel
          .to(
            overlayEl,
            {
              clipPath: "inset(0% 0 0 0)",
              backdropFilter: `blur(${overlayBlur}px)`,
              ease: overlayEase,
            },
            overlayRevealDelay,
          )
          // Content slides in and unblurs
          .to(
            overlayContent,
            {
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              ease: overlayEase,
            },
            overlayRevealDelay + 0.05,
          )
      } catch (error) {
        console.warn("[v0] GSAP loading failed:", error)
      }
    })()

    return () => {
      cancelled = true
      try {
        ;(heroTl as any)?.kill?.()
        ;(mainTl as any)?.kill?.()
      } catch {}
      try {
        if ((ScrollTrigger as any)?.getAll && rootRef.current) {
          ;(ScrollTrigger as any).getAll().forEach((t: any) => rootRef.current!.contains(t.trigger) && t.kill(true))
        }
      } catch {}
      try {
        if (overlayDarkenEl?.parentElement) {
          overlayDarkenEl.parentElement.removeChild(overlayDarkenEl)
        }
      } catch {}
      try {
        if (rafCb && (gsap as any)?.ticker) {
          ;(gsap as any).ticker.remove(rafCb)
          ;(gsap as any).ticker.lagSmoothing(1000, 16)
        }
      } catch {}
      try {
        ;(lenis as any)?.off?.("scroll", (ScrollTrigger as any)?.update)
        ;(lenis as any)?.destroy?.()
      } catch {}
    }
  }, [
    isClient,
    initialBoxSize,
    targetSize,
    scrollHeightVh,
    overlayBlur,
    overlayRevealDelay,
    eases.container,
    eases.overlay,
    eases.text,
    showHeroExitAnimation,
    sticky,
    smoothScroll,
    JSON.stringify(lenisOptions),
  ])

  // Media rendering
  const renderMedia = () => {
    return (
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/1_bMrTysuJs?si=onr0yL39PZMa8TfS&autoplay=1&mute=1&loop=1&playlist=1_bMrTysuJs"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          border: "none",
        }}
      />
    )
  }

  return (
    <>
      <BookingDialog 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <div ref={rootRef} className={["hsv-root", className].filter(Boolean).join(" ")} style={{ ...cssVars, ...style }}>
        

        {/* Headline/hero area */}
      <div className="hsv-container" ref={headlineRef}>
        <div className="hsv-headline">
          <h1 className="hsv-title">
            <span className="text-black">Diventa Parte Della </span>
            <span className="font-black text-transparent" style={{
              WebkitTextStroke: '3px #8b5cf6'
            }}>
              Leggenda
            </span>
          </h1>
          {subtitle ? <h2 className="hsv-subtitle">{subtitle}</h2> : null}
          <div className="hsv-cta">
            <button 
              className="hsv-cta-button"
              onClick={() => setIsBookingOpen(true)}
            >
              Prenota l'esperienza
            </button>
          </div>
          {credits ? <div className="hsv-credits">{credits}</div> : null}
        </div>
      </div>

      {/* Sticky scroll section */}
      <div className="hsv-scroll" data-sticky-scroll style={{ height: `${Math.max(150, scrollHeightVh)}vh` }}>
        <div className={`hsv-sticky ${sticky ? "is-sticky" : ""}`}>
          <div className="hsv-media" ref={containerRef}>
            {renderMedia()}

            {/* overlay that reveals */}
            <div className="hsv-overlay" ref={overlayRef}>
              <div className="hsv-overlay-content" ref={overlayContentRef}>
                {overlay?.heading ? <h3>{overlay.heading}</h3> : null}
                {overlay?.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {overlay?.extra}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles (scoped) */}
      <style>{`
        /* System theme: define light defaults, override in dark */
        .hsv-root {
          /* Light */
          --bg: transparent;
          --text: hsl(var(--foreground));
          --muted: #6b7280;
          --muted-bg: rgba(15,17,21,0.06);
          --muted-border: rgba(15,17,21,0.12);
          --overlay-bg: rgba(10,10,14,0.42);
          --overlay-text: #ffffff;
          --accent: #7c3aed;    /* violet */
          --accent-2: #22d3ee;  /* cyan */
          --shadow: 0 10px 30px rgba(0,0,0,0.08);

          color-scheme: light dark;
          background: transparent;
          color: var(--text);
          font-family: Inter, Inter var, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
          overflow-x: clip;
          position: relative;
        }



        @media (prefers-color-scheme: dark) {
          .hsv-root {
            --bg: transparent;
            --text: #e5e7eb;
            --muted: #9ca3af;
            --muted-bg: rgba(229,231,235,0.08);
            --muted-border: rgba(229,231,235,0.14);
            --overlay-bg: rgba(8,8,12,0.55);
            --overlay-text: #ffffff;
            --accent: #8b5cf6;
            --accent-2: #22d3ee;
            --shadow: 0 12px 36px rgba(0,0,0,0.35);
          }
        }

        .hsv-container {
          height: 100vh;
          display: grid;
          place-items: center;
          padding: clamp(16px, 3vw, 40px);
          padding-left: clamp(24px, 6vw, 48px);
          padding-right: clamp(24px, 6vw, 48px);
          perspective: 900px;
          position: relative;
        }
        .hsv-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/header_background.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.4;
          z-index: 1;
          mask: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 90%);
        }
        
        @media (max-width: 768px) {
          .hsv-container::before {
            background-position: center top;
            background-size: cover;
          }
        }
        .hsv-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 0;
          mask: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 90%);
          -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 90%);
        }

        .hsv-headline { 
          text-align: center;
          transform-style: preserve-3d;
          max-width: min(100%, 1100px);
          position: relative;
          z-index: 10;
        }
        .hsv-headline > * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transform-origin: center top;
        }

        .hsv-title {
          margin: 0 0 .6rem 0;
          font-size: clamp(48px, 10vw, 120px);
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.03em;
          text-wrap: balance;
          color: var(--text);
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
          text-shadow: 
            0 2px 4px rgba(0,0,0,0.3),
            0 4px 8px rgba(0,0,0,0.2),
            0 1px 0px rgba(255,255,255,0.8);
        }
        .hsv-title span {
          display: inline-block;
        }
        .hsv-subtitle {
          margin: 0 0 1.25rem 0;
          font-size: clamp(18px, 3.5vw, 28px);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #1e293b;
          text-shadow: 0 1px 2px rgba(255,255,255,0.8);
        }
        .hsv-meta {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .4rem .7rem;
          border-radius: 999px;
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .02em;
          background: var(--muted-bg);
          border: 1px solid var(--muted-border);
          box-shadow: var(--shadow);
          color: var(--text);
          margin: 1rem 0 0 0;
        }
        .hsv-meta::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          display: inline-block;
        }
        .hsv-credits {
          margin-top: 1.1rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
        .hsv-cta {
          margin: 2rem 0 1.5rem 0;
          display: flex;
          justify-content: center;
        }
        .hsv-cta-button {
          position: relative;
          background: white;
          color: black;
          border: 2px solid black;
          padding: 1.2rem 3rem;
          font-size: 1.25rem;
          font-weight: 900;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.9);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .hsv-cta-button:hover {
          transform: scale(1.02) translateY(-2px);
          box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.9);
        }
        .hsv-cta-button:active {
          transform: scale(0.95);
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.9);
        }

        .hsv-scroll { position: relative; }
        .hsv-sticky.is-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          place-items: center;
        }

        .hsv-media {
          position: relative;
          width: var(--initial-size);
          height: var(--initial-size);
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          display: grid;
          place-items: center;
          transition: border-radius 0.3s ease;
          box-shadow: var(--shadow);
        }

        .hsv-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-bg);
          color: var(--overlay-text);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(16px, 4vw, 40px);
          clip-path: inset(100% 0 0 0);
          backdrop-filter: blur(var(--overlay-blur));
          z-index: 2;
        }

        .hsv-overlay-content {
          margin-top: 1.2rem;
          max-width: 68ch;
          display: grid;
          gap: 0.9rem;
        }
        .hsv-overlay-content h3 {
          font-size: clamp(26px, 5vw, 50px);
          line-height: 1.02;
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.01em;
          background: linear-gradient(90deg, #fff 0%, #fff 40%, var(--accent-2) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-wrap: balance;
          position: relative;
        }
        .hsv-overlay-content h3::after {
          content: "";
          display: block;
          width: 72px;
          height: 3px;
          border-radius: 999px;
          margin: 10px auto 0 auto;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          opacity: 0.9;
        }
        .hsv-overlay-content p {
          font-size: clamp(15px, 2.1vw, 19px);
          line-height: 1.75;
          margin: 0;
          color: #f3f4f6; /* better contrast over video */
          opacity: 0.95;
        }

        @media (max-width: 900px) {
          .hsv-overlay-content { max-width: 40ch; }
        }
      `}</style>
      </div>
    </>
  )
}

export default HeroScrollVideo
