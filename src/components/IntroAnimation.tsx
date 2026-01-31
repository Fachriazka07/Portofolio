import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./styles/IntroAnimation.css";

interface IntroAnimationProps {
    onComplete: () => void;
}

// Array of fun emojis to cycle through
const EMOJIS = ["😊", "🚀", "💻", "✨", "🎨", "⚡"];

// Array of brutalist fonts to cycle through
const FONTS = [
    "'Verdana', sans-serif",
    "'Arial Black', sans-serif",
    "'Courier New', monospace",
    "'Georgia', serif",
    "'Comic Sans MS', cursive",
    "'Trebuchet MS', sans-serif"
];

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const helloRef = useRef<HTMLDivElement>(null);
    const helloTextRef = useRef<HTMLSpanElement>(null);
    const emojiRef = useRef<HTMLSpanElement>(null);
    const blockLeftRef = useRef<HTMLDivElement>(null);
    const blockRightRef = useRef<HTMLDivElement>(null);
    const [currentEmoji, setCurrentEmoji] = useState(EMOJIS[0]);
    const [currentFont, setCurrentFont] = useState(FONTS[0]);

    useEffect(() => {
        let emojiIndex = 0;
        let fontIndex = 0;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(onComplete, 100);
                }
            });

            // Function to cycle emojis and fonts
            const cycleEmojiAndFont = () => {
                emojiIndex = (emojiIndex + 1) % EMOJIS.length;
                fontIndex = (fontIndex + 1) % FONTS.length;
                setCurrentEmoji(EMOJIS[emojiIndex]);
                setCurrentFont(FONTS[fontIndex]);
            };

            // 1. Blocks slide in to cover screen
            tl.set([blockLeftRef.current, blockRightRef.current], {
                scaleX: 0,
                transformOrigin: (i) => (i === 0 ? "left center" : "right center")
            });

            tl.to([blockLeftRef.current, blockRightRef.current], {
                scaleX: 1,
                duration: 0.4,
                ease: "power2.inOut"
            });

            // 2. Hello text slams in
            tl.fromTo(
                helloRef.current,
                { y: 100, opacity: 0, scale: 0.5 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }
            );

            // 3. Emoji bounces in
            tl.fromTo(
                emojiRef.current,
                { scale: 0, rotation: -45 },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                },
                "-=0.3"
            );

            // 4. Cycle through emojis AND fonts with shake
            for (let i = 0; i < EMOJIS.length; i++) {
                // Shake emoji
                tl.to(emojiRef.current, {
                    scale: 0.8,
                    rotation: -15,
                    duration: 0.1,
                    ease: "power2.in",
                    onComplete: cycleEmojiAndFont
                });

                // Shake text too
                tl.to(helloTextRef.current, {
                    scale: 0.95,
                    duration: 0.05,
                    ease: "power2.in"
                }, "<");

                tl.to(emojiRef.current, {
                    scale: 1.2,
                    rotation: 15,
                    duration: 0.15,
                    ease: "elastic.out(1, 0.5)"
                });

                tl.to(helloTextRef.current, {
                    scale: 1.05,
                    duration: 0.1,
                    ease: "elastic.out(1, 0.5)"
                }, "<");

                tl.to(emojiRef.current, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.1,
                    ease: "power2.out"
                });

                tl.to(helloTextRef.current, {
                    scale: 1,
                    duration: 0.05,
                    ease: "power2.out"
                }, "<");
            }

            // 5. Short pause
            tl.to({}, { duration: 0.2 });

            // 6. Everything fades and slides up
            tl.to(helloRef.current, {
                y: -80,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in"
            });

            // 7. Blocks slide apart
            tl.to(blockLeftRef.current, {
                x: "-100%",
                duration: 0.5,
                ease: "power2.inOut"
            }, "-=0.2");

            tl.to(blockRightRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power2.inOut"
            }, "<");

            // 8. Container fades out
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={containerRef} className="intro-container">
            {/* Left Block */}
            <div ref={blockLeftRef} className="intro-block intro-block-left"></div>

            {/* Right Block */}
            <div ref={blockRightRef} className="intro-block intro-block-right"></div>

            {/* Content */}
            <div className="intro-content">
                <div ref={helloRef} className="intro-hello">
                    <span
                        ref={helloTextRef}
                        className="intro-hello-text"
                        style={{ fontFamily: currentFont }}
                    >
                        Hello
                    </span>
                    <span ref={emojiRef} className="intro-hello-emoji">{currentEmoji}</span>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="intro-decoration intro-deco-1"></div>
            <div className="intro-decoration intro-deco-2"></div>
            <div className="intro-decoration intro-deco-3"></div>
        </div>
    );
}
