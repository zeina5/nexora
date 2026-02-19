import { Box, Container, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import classes from "./Footer.module.css";

interface FooterProps {
  locale: string;
}

/**
 * Site footer with links and branding — Server Component
 */
export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");

  const footerSections = [
    {
      title: t("product"),
      links: [
        { label: t("links.features"), href: "#features" },
        { label: t("links.pricing"), href: "#pricing" },
        { label: t("links.demo"), href: `/${locale}/demo` },
        { label: t("links.changelog"), href: "#" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("links.about"), href: "#" },
        { label: t("links.blog"), href: `/${locale}/blog` },
        { label: t("links.careers"), href: "#" },
        { label: t("links.contact"), href: "#" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("links.privacy"), href: "#" },
        { label: t("links.terms"), href: "#" },
        { label: t("links.security"), href: "#" },
      ],
    },
  ];

  return (
    <Box component="footer" className={classes.footer} role="contentinfo">
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" pb="3xl">
          {/* Brand column */}
          <Stack gap="sm">
            <Group gap="xs">
              <Box className={classes.logoMark} />
              <Text fw={800} fz={18} style={{ letterSpacing: "-0.03em" }}>
                nexora
              </Text>
            </Group>
            <Text fz="sm" c="dimmed" maw={240} lh={1.7}>
              {t("tagline")}
            </Text>
          </Stack>

          {/* Link columns */}
          {footerSections.map((section) => (
            <Stack key={section.title} gap="sm">
              <Text fw={600} fz="sm" tt="uppercase" style={{ letterSpacing: "0.06em" }}>
                {section.title}
              </Text>
              {section.links.map((link) => (
                <Text
                  key={link.label}
                  component="a"
                  href={link.href}
                  fz="sm"
                  c="dimmed"
                  className={classes.link}
                >
                  {link.label}
                </Text>
              ))}
            </Stack>
          ))}
        </SimpleGrid>

        <Divider />

        <Group justify="space-between" py="lg" wrap="wrap" gap="xs">
          <Text fz="sm" c="dimmed">
            {t("copyright")}
          </Text>
          <Group gap="xs">
            <Box className={classes.statusDot} />
            <Text fz="sm" c="dimmed">
              All systems operational
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
