"use client";

import { Box, Button, Container, Group, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import classes from "./HeroSection.module.css";

const trustedLogos = ["Vercel", "Stripe", "Linear", "Notion", "Figma"];

/**
 * Animated hero section with floating particles and gradient orbs
 */
export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <Box component="section" className={classes.hero} aria-labelledby="hero-headline">
      {/* Background effects */}
      <Box className={`${classes.orb} ${classes.orbPrimary}`} aria-hidden="true" />
      <Box className={`${classes.orb} ${classes.orbSecondary}`} aria-hidden="true" />
      <Box className={`grid-bg ${classes.gridBg}`} aria-hidden="true" />

      <Container size="xl" className={classes.container}>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className={classes.content}
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <Group justify="center">
              <Box className={classes.badge}>
                <Box className={classes.badgeDot} aria-hidden="true" />
                <Text fz="sm" fw={600}>
                  {t("badge")}
                </Text>
              </Box>
            </Group>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUpVariants}>
            <Text
              id="hero-headline"
              component="h1"
              fz={{ base: 40, sm: 52, md: 68, lg: 80 }}
              fw={800}
              ta="center"
              lh={1.05}
              className={classes.headline}
              style={{ letterSpacing: "-0.03em" }}
            >
              {t("headline")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {i === 1 ? (
                      <span className="gradient-text">{line}</span>
                    ) : (
                      line
                    )}
                    {i < t("headline").split("\n").length - 1 && <br />}
                  </span>
                ))}
            </Text>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={fadeUpVariants}>
            <Text
              ta="center"
              fz={{ base: "md", sm: "lg", md: "xl" }}
              c="dimmed"
              maw={640}
              mx="auto"
              lh={1.7}
            >
              {t("subheadline")}
            </Text>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUpVariants}>
            <Group justify="center" gap="md" mt="sm">
              <GradientButton
   
                href="#"
                rightSection={<ArrowRight size={17} />}
              >
                {t("cta")}
              </GradientButton>

              <Button
                component="a"
                href="#demo"
                variant="subtle"
                color="gray"
                size="lg"
                radius="md"
                fw={500}
                leftSection={<Play size={15} fill="currentColor" />}
              >
                {t("ctaSecondary")}
              </Button>
            </Group>
          </motion.div>

          {/* Trusted by */}
          <motion.div variants={fadeUpVariants}>
            <Stack align="center" gap="sm" mt="xl">
              <Text fz="xs" c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: "0.08em" }}>
                {t("trustedBy")}
              </Text>
              <Group gap="xl" justify="center" wrap="wrap">
                {trustedLogos.map((logo) => (
                  <Text key={logo} fw={700} fz="sm" c="dimmed" className={classes.trustedLogo}>
                    {logo}
                  </Text>
                ))}
              </Group>
            </Stack>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={classes.previewWrapper}
        >
          <Box className={classes.preview} aria-hidden="true">
            <Box className={classes.previewHeader}>
              <Group gap={6}>
                <Box className={classes.trafficLight} style={{ background: "#ff5f57" }} />
                <Box className={classes.trafficLight} style={{ background: "#ffbd2e" }} />
                <Box className={classes.trafficLight} style={{ background: "#28ca41" }} />
              </Group>
              <Text fz="xs" c="dimmed" fw={500}>
                nexora.io/dashboard
              </Text>
              <Box w={60} />
            </Box>

            {/* Fake dashboard content */}
            <Box className={classes.previewContent}>
              <Group gap="sm" mb="md">
                {[
                  { label: "Revenue", value: "$284k", change: "+12.4%" },
                  { label: "Users", value: "48.2k", change: "+8.1%" },
                  { label: "Conversion", value: "3.2%", change: "+0.4%" },
                ].map((metric) => (
                  <Box key={metric.label} className={classes.previewMetric}>
                    <Text fz={10} c="dimmed" mb={2}>
                      {metric.label}
                    </Text>
                    <Text fz={18} fw={700} lh={1}>
                      {metric.value}
                    </Text>
                    <Text fz={10} c="teal" fw={600}>
                      {metric.change}
                    </Text>
                  </Box>
                ))}
              </Group>

              {/* Fake chart bars */}
              <Box className={classes.chartArea}>
                {Array.from({ length: 24 }, (_, i) => {
                  const heights = [30, 45, 35, 60, 55, 70, 50, 80, 65, 90, 75, 85, 70, 95, 80, 72, 88, 76, 82, 91, 78, 84, 79, 87];
                  return (
                    <motion.div
                      key={i}
                      className={classes.chartBar}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.8 + i * 0.03, duration: 0.4 }}
                      style={{ height: `${heights[i]}%` }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* Glow under preview */}
          <Box className={classes.previewGlow} aria-hidden="true" />
        </motion.div>
      </Container>
    </Box>
  );
}
