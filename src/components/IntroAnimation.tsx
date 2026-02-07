import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./styles/IntroAnimation.css";

interface IntroAnimationProps {
    onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterContainerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const textRevealRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(onComplete, 50);
                }
            });

            // 1. Counter animation (0 to 100) - 2 seconds
            tl.to({ val: 0 }, {
                val: 100,
                duration: 2,
                ease: "power2.inOut",
                onUpdate: function () {
                    setCount(Math.round(this.targets()[0].val));
                }
            });

            // 2. Progress bar fills simultaneously
            tl.to(progressFillRef.current, {
                width: "100%",
                duration: 2,
                ease: "power2.inOut"
            }, "<");

            // 3. Brief pause at 100%
            tl.to({}, { duration: 0.2 });

            // 4. Counter + % scales up and fades TOGETHER
            tl.to(counterContainerRef.current, {
                scale: 1.2,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });

            // 5. Progress bar shrinks
            tl.to(progressRef.current, {
                scaleX: 0,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in"
            }, "-=0.2");

            // 6. Text reveal - name appears
            tl.fromTo(textRevealRef.current,
                {
                    clipPath: "inset(0 100% 0 0)",
                    opacity: 1
                },
                {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.5,
                    ease: "power3.inOut"
                }
            );

            // 7. Hold with name visible
            tl.to({}, { duration: 0.3 });

            // 8. Text slides up and fades
            tl.to(textRevealRef.current, {
                y: -40,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });

            // 9. Overlay slides up to reveal page
            tl.to(overlayRef.current, {
                yPercent: -100,
                duration: 0.5,
                ease: "power3.inOut"
            }, "-=0.1");

            // 10. Container fades
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.1
            });

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={containerRef} className="preloader">
            {/* Background Overlay */}
            <div ref={overlayRef} className="preloader-overlay">
                {/* Counter */}
                <div ref={counterContainerRef} className="preloader-counter-container">
                    <span className="preloader-counter">
                        {count}
                    </span>
                    <span className="preloader-percent">%</span>
                </div>

                {/* Progress Bar */}
                <div ref={progressRef} className="preloader-progress">
                    <div ref={progressFillRef} className="preloader-progress-fill"></div>
                </div>

                {/* Name Reveal */}
                <div ref={textRevealRef} className="preloader-name">
                    WELCOME TO MY PORTOFOLIO
                </div>
            </div>

            {/* Decorative Lines */}
            <div className="preloader-line preloader-line-1"></div>
            <div className="preloader-line preloader-line-2"></div>
        </div>
    );
}
