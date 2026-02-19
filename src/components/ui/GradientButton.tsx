"use client";

import { Button, ButtonProps } from "@mantine/core";
import { motion } from "framer-motion";
import classes from "./GradientButton.module.css";

interface GradientButtonProps extends ButtonProps {
  onClick?: () => void;
  href?: string;
}

/**
 * Premium gradient CTA button with hover animation
 */
export function GradientButton({ children, href, ...props }: GradientButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ display: "inline-flex" }}
    >
      {href ? (
        <Button
          component="a"
          href={href}
          size="lg"
          className={classes.root}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 135 }}
          radius="md"
          fw={600}
          {...props}
        >
          {children}
        </Button>
      ) : (
        <Button
          size="lg"
          className={classes.root}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 135 }}
          radius="md"
          fw={600}
          {...props}
        >
          {children}
        </Button>
      )}
    </motion.div>
  );
}