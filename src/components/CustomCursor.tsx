import { useEffect, useRef, useState } from "react";
import "./styles/CustomCursor.css";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Don't show on mobile/tablet
        const isTouchDevice = typeof window !== "undefined" &&
            ("ontouchstart" in window || navigator.maxTouchPoints > 0);

        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        if (!cursor || !cursorDot) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;
        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            dotX += (mouseX - dotX) * 0.35;
            dotY += (mouseY - dotY) * 0.35;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, .hoverable");
            setIsHovering(!!isInteractive);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousemove", handleElementHover);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        requestAnimationFrame(animate);

        document.body.style.cursor = "none";

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mousemove", handleElementHover);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "auto";
        };
    }, [isVisible]);

    if (typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorRef}
                className={`custom-cursor ${isHovering ? "hovering" : ""} ${isClicking ? "clicking" : ""} ${isVisible ? "visible" : ""}`}
            />
            <div
                ref={cursorDotRef}
                className={`custom-cursor-dot ${isHovering ? "hovering" : ""} ${isClicking ? "clicking" : ""} ${isVisible ? "visible" : ""}`}
            />
        </>
    );
}
