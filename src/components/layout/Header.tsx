"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import classes from "./Header.module.css";

/**
 * Main site header with scroll-aware background and mobile drawer
 */
export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}#features`, label: t("product") },
    { href: `/${locale}#pricing`, label: t("pricing") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/demo`, label: t("demo") },
  ];

  return (
    <>
      <Box
        component="header"
        className={`${classes.header} ${scrolled ? classes.scrolled : ""}`}
        aria-label="Main navigation"
      >
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%" wrap="nowrap">
            {/* Logo */}
            <Link href={`/${locale}`} className={classes.logo} aria-label="Nexora home">
              <Box className={classes.logoMark} />
              <Text fw={800} fz={20} lh={1} style={{ letterSpacing: "-0.03em" }}>
                nexora
              </Text>
            </Link>

            {/* Desktop Nav */}
            <Group gap="xs" visibleFrom="md">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  component="a"
                  href={link.href}
                  variant="subtle"
                  color="gray"
                  size="sm"
                  radius="md"
                  fw={500}
                  className={classes.navLink}
                >
                  {link.label}
                </Button>
              ))}
            </Group>

            {/* Right actions */}
            <Group gap="xs" wrap="nowrap">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button
                component="a"
                href="#"
                variant="subtle"
                color="gray"
                size="sm"
                fw={500}
                visibleFrom="sm"
              >
                {t("signIn")}
              </Button>
              <Button
                component="a"
                href="#"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 135 }}
                size="sm"
                radius="md"
                fw={600}
                visibleFrom="sm"
              >
                {t("getStarted")}
              </Button>

              {/* Mobile burger */}
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="md"
                size="sm"
                aria-label="Toggle navigation"
              />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={mobileOpened}
        onClose={closeMobile}
        title={
          <Text fw={800} fz={18} style={{ letterSpacing: "-0.03em" }}>
            nexora
          </Text>
        }
        size="xs"
        position={locale === "ar" ? "right" : "left"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Stack gap="xs">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              component="a"
              href={link.href}
              variant="subtle"
              color="gray"
              justify="flex-start"
              size="md"
              radius="md"
              fullWidth
              onClick={closeMobile}
            >
              {link.label}
            </Button>
          ))}
          <Divider my="sm" />
          <Button variant="subtle" color="gray" fullWidth>
            {t("signIn")}
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 135 }}
            fullWidth
            radius="md"
          >
            {t("getStarted")}
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
