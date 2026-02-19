"use client";

import { Box, Button, Container, Group, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import classes from "./CTASection.module.css";

/**
 * Final CTA section with gradient background and animations
 */
export function CTASection() {
  const t = useTranslations("cta");

  return (
    <Box component="section" py={{ base: "4xl", md: "5xl" }} className={classes.section}>
      <Container size="lg">
        <motion.div
          className={classes.card}
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Orb decorations */}
          <Box className={`${classes.orb} ${classes.orb1}`} aria-hidden="true" />
          <Box className={`${classes.orb} ${classes.orb2}`} aria-hidden="true" />

          <Stack align="center" gap="xl" ta="center" pos="relative" style={{ zIndex: 1 }}>
            <motion.div variants={fadeUpVariants}>
              <Text
                component="h2"
                fz={{ base: 28, sm: 36, md: 48 }}
                fw={800}
                lh={1.15}
                maw={600}
                style={{ letterSpacing: "-0.02em" }}
              >
                {t("headline")}
              </Text>
            </motion.div>

            <motion.div variants={fadeUpVariants}>
              <Text fz={{ base: "md", md: "lg" }} c="dimmed" maw={480} lh={1.7}>
                {t("subheadline")}
              </Text>
            </motion.div>

            <motion.div variants={fadeUpVariants}>
              <Group gap="md" justify="center" wrap="wrap">
                <GradientButton rightSection={<ArrowRight size={17} />}>
                  {t("primary")}
                </GradientButton>
                <Button
                  variant="subtle"
                  color="gray"
                  size="lg"
                  radius="md"
                  fw={500}
                  leftSection={<Calendar size={16} />}
                >
                  {t("secondary")}
                </Button>
              </Group>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
