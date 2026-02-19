"use client";

import { Box, Card, Text, ThemeIcon } from "@mantine/core";
import { motion } from "framer-motion";
import { fadeInScaleVariants } from "@/lib/animations";
import classes from "./FeatureCard.module.css";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

/**
 * Individual feature card with hover glow effect
 */
export function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeInScaleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index}
      transition={{ delay: index * 0.08 }}
    >
      <Card className={classes.card} h="100%">
        <ThemeIcon
          size={52}
          radius="lg"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 135 }}
          mb="md"
          className={classes.icon}
        >
          {icon}
        </ThemeIcon>

        <Text fw={600} fz={17} mb={8} lh={1.3}>
          {title}
        </Text>

        <Text fz="sm" lh={1.7} c="dimmed">
          {description}
        </Text>

        {/* Hover glow accent */}
        <Box className={classes.glow} />
      </Card>
    </motion.div>
  );
}
