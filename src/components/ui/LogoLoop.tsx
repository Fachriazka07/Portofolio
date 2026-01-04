import React from "react";
import { ImageWithFallback } from "./ImageWithFallback";

type TechLogo = {
  node?: React.ReactNode;
  title?: string;
  href?: string;
  src?: string;
  alt?: string;
};

type LogoLoopProps = {
  logos: TechLogo[];
  speed?: number; // px per second
  direction?: "left" | "right";
  logoHeight?: number; // px
  gap?: number; // px
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
};

// Lightweight marquee-style logo loop with simple CSS animation.
export default function LogoLoop({
  logos,
  speed = 90,
  direction = "right",
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = false,
  fadeOutColor = "transparent",
  ariaLabel,
}: LogoLoopProps) {
  const duration = Math.max(8, Math.round((logos.length * (logoHeight + gap)) / speed));

  const trackStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: `${gap}px`,
    animation: `${direction === "left" ? "scrollLeft" : "scrollRight"} ${duration}s linear infinite`,
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    WebkitMaskImage: fadeOut
      ? "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
      : undefined,
    maskImage: fadeOut
      ? "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
      : undefined,
  };

  const itemStyle: React.CSSProperties = {
    height: `${logoHeight}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: scaleOnHover ? "transform 180ms ease" : undefined,
  };

  return (
    <div aria-label={ariaLabel} style={containerStyle} className={pauseOnHover ? "logo-loop-container hover-pause" : "logo-loop-container"}>
      <style>
        {`
        @keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .logo-loop-container .logo-track:hover { ${pauseOnHover ? "animation-play-state: paused;" : ""} }
        .logo-item:hover { ${scaleOnHover ? "transform: translateY(-4px) scale(1.04);" : ""} }
        .logo-label { position: absolute; left: 50%; transform: translateX(-50%); bottom: calc(100% + 8px); padding: 6px 10px; border-radius: 999px; background: rgba(0,0,0,0.65); color: #fff; font-size: 12px; line-height: 1; white-space: nowrap; opacity: 0; transition: opacity 150ms ease, transform 150ms ease; pointer-events: none; }
        @media (prefers-color-scheme: light) { .logo-label { background: rgba(0,0,0,0.75); color: #fff; } }
        .logo-item:hover .logo-label { opacity: 1; }
        `}
      </style>
      <div className="logo-track" style={trackStyle}>
        {[...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="logo-item"
            style={itemStyle}
            aria-label={logo.title || logo.alt}
            role="img"
          >
            {logo.title ? <span className="logo-label">{logo.title}</span> : null}
            {logo.node ? (
              <div style={{ height: `${logoHeight}px`, width: "auto", display: "grid", placeItems: "center" }}>{logo.node}</div>
            ) : logo.src ? (
              <ImageWithFallback src={logo.src} alt={logo.alt || "logo"} width={logoHeight} height={logoHeight} style={{ height: `${logoHeight}px`, width: "auto" }} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
