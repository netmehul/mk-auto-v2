import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
};

export function RevealGroup({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "p" | "span" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}

export function Eyebrow({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "light" }) {
  return (
    <RevealItem className="flex items-center gap-3">
      <motion.span
        className="block h-px bg-gold"
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: easeOut }}
      />
      <span className={tone === "gold" ? "eyebrow text-gold" : "eyebrow text-off-white/70"}>{children}</span>
    </RevealItem>
  );
}
