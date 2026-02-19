import { Box, Button, Container, Stack, Text } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface PageProps {
  params: { locale: string };
}

/**
 * Custom 404 page with Nexora brand styling
 */
export default async function NotFoundPage({ params: { locale } }: PageProps) {
  const t = await getTranslations("404");

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <Box
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "50%",
          left: "50%",
          transform: "translate(-30%, -60%)",
          pointerEvents: "none",
        }}
      />

      <Container size="sm" ta="center">
        <Stack align="center" gap="xl">
          {/* Big 404 */}
          <Text
            fz={160}
            fw={900}
            lh={1}
            style={{
              letterSpacing: "-0.05em",
              background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(6,182,212,0.15) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(99,102,241,0.3))",
            }}
          >
            {t("code")}
          </Text>

          <Stack align="center" gap="md">
            <Text
              fz={{ base: 28, md: 36 }}
              fw={800}
              lh={1.2}
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </Text>
            <Text c="dimmed" fz="md" lh={1.7} maw={440}>
              {t("description")}
            </Text>
          </Stack>

          <Button
            component={Link}
            href={`/${locale}`}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 135 }}
            size="lg"
            radius="md"
            fw={600}
          >
            {t("cta")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
