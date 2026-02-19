"use client";

import { Badge, BadgeProps } from "@mantine/core";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/animations";

interface SectionBadgeProps extends Omit<BadgeProps, "children"> {
  children: React.ReactNode;
  animate?: boolean;
}

/**
 * Reusable section badge with optional entrance animation
 */
export function SectionBadge({ children, animate = true, ...props }: SectionBadgeProps) {
  const content = (
    <Badge
      size="md"
      variant="light"
      color="indigo"
      radius="xl"
      tt="uppercase"
      fw={600}
      fz={11}
      style={{ letterSpacing: "0.08em" }}
      {...props}
    >
      {children}
    </Badge>
  );

  if (!animate) return content;

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ display: "inline-flex" }}
    >
      {content}
    </motion.div>
  );
}
