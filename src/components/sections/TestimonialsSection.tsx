"use client";

import { Avatar, Box, Card, Container, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { fadeUpVariants, fadeInScaleVariants } from "@/lib/animations";
import classes from "./TestimonialsSection.module.css";

/**
 * Customer testimonials section with quote cards
 */
export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  const testimonials = (t.raw("items") as Array<{
    quote: string;
    author: string;
    role: string;
    avatar: string;
  }>);

  return (
    <Box
      component="section"
      py={{ base: "4xl", md: "5xl" }}
      aria-labelledby="testimonials-headline"
      className={classes.section}
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
              id="testimonials-headline"
              component="h2"
              fz={{ base: 32, sm: 40, md: 48 }}
              fw={800}
              lh={1.1}
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("headline")}
            </Text>
          </motion.div>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInScaleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.12 }}
            >
              <Card className={classes.card} h="100%">
                <Stack gap="lg" h="100%" justify="space-between">
                  <Stack gap="md">
                    <Box className={classes.quoteIcon} aria-hidden="true">
                      <Quote size={18} />
                    </Box>
                    <Text fz="sm" lh={1.8} c="dimmed">
                      &ldquo;{item.quote}&rdquo;
                    </Text>
                  </Stack>

                  <Group gap="sm">
                    <Avatar
                      size={40}
                      radius="xl"
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan", deg: 135 }}
                      fw={700}
                    >
                      {item.avatar}
                    </Avatar>
                    <Stack gap={0}>
                      <Text fw={600} fz="sm">
                        {item.author}
                      </Text>
                      <Text fz="xs" c="dimmed">
                        {item.role}
                      </Text>
                    </Stack>
                  </Group>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
