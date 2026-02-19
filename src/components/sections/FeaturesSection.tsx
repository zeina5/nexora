"use client";

import { Box, Container, SimpleGrid, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Zap,
  BrainCircuit,
  Users,
  Plug,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

const featureIcons = [Zap, BrainCircuit, Users, Plug, ShieldCheck, Code2];

/**
 * Feature grid section with animated cards
 */
export function FeaturesSection() {
  const t = useTranslations("features");

  const featureKeys = [
    "realtime",
    "prediction",
    "collaboration",
    "integrations",
    "security",
    "api",
  ] as const;

  return (
    <Box
      component="section"
      id="features"
      py={{ base: "4xl", md: "5xl" }}
      aria-labelledby="features-headline"
    >
      <Container size="xl">
        <Stack align="center" gap="sm" mb="3xl" ta="center">
          <SectionBadge>{t("badge")}</SectionBadge>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Text
              id="features-headline"
              component="h2"
              fz={{ base: 32, sm: 40, md: 48 }}
              fw={800}
              lh={1.1}
              maw={700}
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("headline")}
            </Text>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Text
              fz={{ base: "md", md: "lg" }}
              c="dimmed"
              maw={560}
              lh={1.7}
            >
              {t("subheadline")}
            </Text>
          </motion.div>
        </Stack>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {featureKeys.map((key, index) => {
              const Icon = featureIcons[index];
              return (
                <FeatureCard
                  key={key}
                  icon={<Icon size={22} />}
                  title={t(`items.${key}.title`)}
                  description={t(`items.${key}.description`)}
                  index={index}
                />
              );
            })}
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  );
}
