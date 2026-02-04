import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Add lenis class to html element
        document.documentElement.classList.add("lenis");

        // Initialize Lenis smooth scrolling
        const lenis = new Lenis({
            duration: 1.2, // Smooth duration - higher = smoother
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // GSAP ticker for RAF loop
        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            document.documentElement.classList.remove("lenis");
            lenis.destroy();
            gsap.ticker.remove(rafCallback);
        };
    }, []);

    return <>{children}</>;
}

