"use client";

import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  List,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { fadeUpVariants, fadeInScaleVariants } from "@/lib/animations";
import classes from "./PricingSection.module.css";

const planKeys = ["starter", "growth", "enterprise"] as const;
type PlanKey = (typeof planKeys)[number];

/**
 * Pricing section with monthly/yearly toggle and highlighted plan
 */
export function PricingSection() {
  const t = useTranslations("pricing");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const getPlanPrice = (key: PlanKey): string => {
    const base = t(`plans.${key}.price`);
    if (billing === "yearly" && key !== "enterprise" && key !== "starter") {
      const num = parseInt(base.replace("$", ""), 10);
      return `$${Math.round(num * 0.8)}`;
    }
    return base;
  };

  return (
    <Box
      component="section"
      id="pricing"
      py={{ base: "4xl", md: "5xl" }}
      aria-labelledby="pricing-headline"
    >
      <Container size="lg">
        <Stack align="center" gap="sm" mb="3xl" ta="center">
          <SectionBadge>{t("badge")}</SectionBadge>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Text
              id="pricing-headline"
              component="h2"
              fz={{ base: 32, sm: 40, md: 48 }}
              fw={800}
              lh={1.1}
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
            <Text fz={{ base: "md", md: "lg" }} c="dimmed" maw={500} lh={1.7}>
              {t("subheadline")}
            </Text>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Group gap="sm" align="center">
              <SegmentedControl
                value={billing}
                onChange={(v) => setBilling(v as "monthly" | "yearly")}
                data={[
                  { label: t("monthly"), value: "monthly" },
                  { label: t("yearly"), value: "yearly" },
                ]}
                radius="xl"
                size="sm"
              />
              {billing === "yearly" && (
                <Badge color="teal" variant="light" radius="xl" size="sm">
                  {t("save")}
                </Badge>
              )}
            </Group>
          </motion.div>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" align="stretch">
          {planKeys.map((key, index) => {
            const isGrowth = key === "growth";
            const isEnterprise = key === "enterprise";

            return (
              <motion.div
                key={key}
                variants={fadeInScaleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.1 }}
                style={{ display: "flex" }}
              >
                <Card
                  className={`${classes.card} ${isGrowth ? classes.highlighted : ""}`}
                  style={{ flex: 1 }}
                >
                  {isGrowth && (
                    <Badge
                      className={classes.popularBadge}
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan", deg: 135 }}
                      size="sm"
                    >
                      {t("popular")}
                    </Badge>
                  )}

                  <Stack gap="xl" h="100%">
                    <Stack gap="xs">
                      <Text fw={700} fz="lg">
                        {t(`plans.${key}.name`)}
                      </Text>
                      <Text fz="sm" c="dimmed" lh={1.6}>
                        {t(`plans.${key}.description`)}
                      </Text>
                    </Stack>

                    <Group align="flex-end" gap={4}>
                      <Text
                        fz={48}
                        fw={800}
                        lh={1}
                        style={{ letterSpacing: "-0.03em" }}
                        className={isGrowth ? "gradient-text" : ""}
                      >
                        {getPlanPrice(key)}
                      </Text>
                      {!isEnterprise && (
                        <Text fz="sm" c="dimmed" mb={6}>
                          {t(`plans.${key}.period`)}
                        </Text>
                      )}
                    </Group>

                    <List
                      spacing="sm"
                      size="sm"
                      className={classes.featureList}
                      style={{ flex: 1 }}
                    >
                      {(
                        t.raw(`plans.${key}.features`) as string[]
                      ).map((feature: string) => (
                        <List.Item
                          key={feature}
                          icon={
                            <ThemeIcon
                              size={20}
                              radius="xl"
                              variant="light"
                              color={isGrowth ? "indigo" : "gray"}
                            >
                              <Check size={11} />
                            </ThemeIcon>
                          }
                        >
                          {feature}
                        </List.Item>
                      ))}
                    </List>

                    <Button
                      fullWidth
                      size="md"
                      radius="md"
                      variant={isGrowth ? "gradient" : "default"}
                      gradient={isGrowth ? { from: "indigo", to: "cyan", deg: 135 } : undefined}
                      fw={600}
                    >
                      {isEnterprise ? t("ctaEnterprise") : t("cta")}
                    </Button>
                  </Stack>
                </Card>
              </motion.div>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
