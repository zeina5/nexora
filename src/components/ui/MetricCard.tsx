"use client";

import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { DashboardMetric } from "@/types";
import classes from "./MetricCard.module.css";

interface MetricCardProps {
  metric: DashboardMetric;
  index?: number;
}

const trendConfig = {
  up: { icon: TrendingUp, color: "teal" },
  down: { icon: TrendingDown, color: "red" },
  neutral: { icon: Minus, color: "gray" },
};

/**
 * Analytics metric card for the demo dashboard
 */
export function MetricCard({ metric, index = 0 }: MetricCardProps) {
  const trend = trendConfig[metric.trend];
  const TrendIcon = trend.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className={classes.card} h="100%">
        <Stack gap={4}>
          <Text fz="sm" c="dimmed" fw={500}>
            {metric.label}
          </Text>

          <Text fz={28} fw={700} lh={1}>
            {metric.value}
          </Text>

          <Group gap={6} mt={4}>
            <ThemeIcon
              size={20}
              radius="xl"
              variant="light"
              color={trend.color}
            >
              <TrendIcon size={12} />
            </ThemeIcon>
            <Text fz="xs" fw={600} c={trend.color}>
              {metric.change > 0 ? "+" : ""}
              {metric.change}% vs last month
            </Text>
          </Group>
        </Stack>
      </Card>
    </motion.div>
  );
}
