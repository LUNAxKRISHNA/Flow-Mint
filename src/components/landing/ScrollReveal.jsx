import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * SectionReveal — wraps an entire section.
 * On scroll-into-view it fades + slides up and draws the hairlines.
 */
export function SectionReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ItemReveal — staggered reveal for child items (cards, nodes, etc.)
 */
export function ItemReveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  const variants = {
    up:    { hidden: { opacity: 0, y: 24 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: 32 },  visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  };

  const v = variants[direction] || variants.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={v.hidden}
      animate={inView ? v.visible : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * BlueprintReveal — the flagship animation.
 * A scanline sweeps across the container as it enters view,
 * then the content decrypts (fades + blurs) from behind it.
 */
export function BlueprintReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Scanline that sweeps downward */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] z-30 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.7) 50%, transparent 100%)",
          boxShadow: "0 0 16px rgba(57,255,20,0.5)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={inView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 0.9, ease: "easeInOut", delay, times: [0, 0.05, 0.9, 1] }}
      />

      {/* Content decrypts as scanline passes */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * StaggerContainer — wraps a list so children stagger in one by one.
 */
export function StaggerContainer({ children, className = "", delay = 0, stagger = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — must be a direct child of StaggerContainer.
 */
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * CounterReveal — animates a headline with a "glitch-in" character effect.
 * Pass text as a string; each word slides up on reveal.
 */
export function HeadingReveal({ text, className = "", delay = 0, highlightWords = [] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.25em] overflow-hidden ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word);
        return (
          <div key={i} className="overflow-hidden">
            <motion.span
              className={`inline-block ${isHighlight ? "text-primary" : ""}`}
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.07,
              }}
            >
              {word}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
