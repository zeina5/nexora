"use client";

import { Menu, Button, Text } from "@mantine/core";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";

const localeLabels: Record<string, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  ar: { label: "العربية", flag: "🇸🇦" },
};

/**
 * Language switcher with dropdown menu
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const current = localeLabels[locale];

  return (
    <Menu shadow="md" width={160} position="bottom-end">
      <Menu.Target>
        <Button
          variant="subtle"
          color="gray"
          size="sm"
          leftSection={<Globe size={15} />}
          radius="md"
          fw={500}
        >
          {current?.flag} {current?.label}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Language / اللغة</Menu.Label>
        {Object.entries(localeLabels).map(([code, { label, flag }]) => (
          <Menu.Item
            key={code}
            onClick={() => handleLocaleChange(code)}
            fw={locale === code ? 700 : 400}
            color={locale === code ? "indigo" : undefined}
          >
            <Text component="span" fz="sm">
              {flag} {label}
            </Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
