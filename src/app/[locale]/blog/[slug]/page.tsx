import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Badge, Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { ArrowLeft, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getBlogPost } from "@/lib/blog";
import { Link } from "@/i18n/routing";

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params: { locale, slug } }: PageProps): Promise<Metadata> {
  const post = getBlogPost(slug, locale);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

/**
 * Blog post page — renders post header + MDX content placeholder
 */
export default async function BlogPostPage({ params: { locale, slug } }: PageProps) {
  const post = getBlogPost(slug, locale);
  const t = await getTranslations("blog");

  if (!post) notFound();

  return (
    <>
      <Header />
      <main id="main-content">
        <Container size="md" py="4xl" pt="6xl">
          {/* Back link */}
          <Box mb="xl">
            <Link
              href={`/${locale}/blog`}
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--mantine-color-dimmed)",
              }}
            >
              <ArrowLeft size={15} />
              <Text fz="sm">{t("backToBlog")}</Text>
            </Link>
          </Box>

          {/* Post header */}
          <Stack gap="lg" mb="3xl">
            <Badge variant="light" color="indigo" radius="xl" size="sm" w="fit-content">
              {post.category}
            </Badge>

            <Title
              order={1}
              fz={{ base: 28, sm: 36, md: 44 }}
              fw={800}
              lh={1.15}
              style={{ letterSpacing: "-0.025em" }}
            >
              {post.title}
            </Title>

            <Text fz="lg" c="dimmed" lh={1.7}>
              {post.excerpt}
            </Text>

            <Group gap="lg" c="dimmed">
              <Group gap={6}>
                <Clock size={14} />
                <Text fz="sm">
                  {post.readTime} {t("minRead")}
                </Text>
              </Group>
              <Text fz="sm">
                {new Date(post.date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Group>
          </Stack>

          {/* Post content (MDX placeholder) */}
          <Box
            style={{
              borderTop: "1px solid var(--mantine-color-default-border)",
              paddingTop: "2rem",
            }}
          >
            <Stack gap="xl">
              <Text fz="md" lh={1.9}>
                This is where your MDX blog content would render. In a production setup, you would
                co-locate <code>.mdx</code> files inside{" "}
                <code>content/blog/[locale]/[slug].mdx</code> and use <code>next-mdx-remote</code>{" "}
                or the built-in <code>@next/mdx</code> loader to compile and render them as React
                components.
              </Text>

              <Box
                p="xl"
                style={{
                  background: "var(--mantine-color-dark-7)",
                  borderRadius: 12,
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                <Text
                  fz="sm"
                  c="dimmed"
                  mb="xs"
                  fw={600}
                  tt="uppercase"
                  style={{ letterSpacing: "0.06em" }}
                >
                  Example MDX frontmatter
                </Text>
                <Box
                  component="pre"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 13,
                    lineHeight: 1.7,
                    overflowX: "auto",
                    margin: 0,
                  }}
                >
                  {`---
title: "${post.title}"
date: "${post.date}"
readTime: ${post.readTime}
category: "${post.category}"
---`}
                </Box>
              </Box>

              <Text fz="md" lh={1.9}>
                The Nexora blog supports GitHub Flavored Markdown, syntax-highlighted code blocks
                (via rehype-highlight), and custom MDX components for callouts, diagrams, and
                interactive widgets — all rendered server-side for optimal SEO and performance.
              </Text>
            </Stack>
          </Box>
        </Container>
      </main>
      <Footer locale={locale} />
    </>
  );
}
