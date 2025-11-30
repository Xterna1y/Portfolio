// src/lib/motionVariants.ts
import { Variants } from "framer-motion";

export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
};

export const cardLift: Variants = {
  rest: { y: 0, boxShadow: "0 20px 50px rgba(11,23,50,0.06)", scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 30px 80px rgba(11,23,50,0.12)",
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export const progressBar: Variants = {
  hidden: { width: 0 },
  show: (custom: number) => ({
    width: `${custom}%`,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
