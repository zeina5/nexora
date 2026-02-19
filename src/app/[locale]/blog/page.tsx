import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Box, Badge, Card, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { ArrowRight, Clock } from "lucide-react";
import NextLink from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts } from "@/lib/blog";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

/**
 * Blog listing page — Server Component
 */
export default async function BlogPage({ params: { locale } }: PageProps) {
  const t = await getTranslations("blog");
  const posts = getBlogPosts(locale);

  return (
    <>
      <Header />
      <main id="main-content">
        <Container size="lg" py="4xl" pt="6xl">
          <Stack align="center" ta="center" gap="md" mb="3xl">
            <Title
              order={1}
              fz={{ base: 36, md: 52 }}
              fw={800}
              style={{ letterSpacing: "-0.025em" }}
            >
              {t("title")}
            </Title>
            <Text fz="lg" c="dimmed" maw={520} lh={1.7}>
              {t("subtitle")}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {posts.map((post) => (
              // Wrap the entire Card in a native Next.js Link instead of passing
              // next-intl's Link as a `component` prop (which causes the Server→Client error)
              <NextLink
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "flex" }}
              >
                <Card
                  padding="xl"
                  radius="lg"
                  style={{
                    border: "1px solid var(--mantine-color-default-border)",
                    flex: 1,
                    cursor: "pointer",
                    transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <Stack gap="md" h="100%" justify="space-between">
                    <Stack gap="sm">
                      <Badge variant="light" color="indigo" radius="xl" size="sm" w="fit-content">
                        {post.category}
                      </Badge>
                      <Text fw={700} fz="md" lh={1.3}>
                        {post.title}
                      </Text>
                      <Text fz="sm" c="dimmed" lh={1.7}>
                        {post.excerpt}
                      </Text>
                    </Stack>

                    <Group justify="space-between" mt="xs">
                      <Group gap={6}>
                        <Clock size={13} />
                        <Text fz="xs" c="dimmed">
                          {post.readTime} {t("minRead")}
                        </Text>
                      </Group>
                      <Group gap={4} c="indigo">
                        <Text fz="xs" fw={600}>
                          {t("readMore")}
                        </Text>
                        <ArrowRight size={13} />
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              </NextLink>
            ))}
          </SimpleGrid>
        </Container>
      </main>
      <Footer locale={locale} />
    </>
  );
}
