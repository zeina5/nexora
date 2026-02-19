"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Card,
  Container,
  Group,
  Loader,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
  ThemeIcon,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Info,
  RefreshCw,
} from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { generateRevenueData, formatCurrency } from "@/lib/utils";
import type { DashboardMetric, AlertItem } from "@/types";
import classes from "./DemoDashboard.module.css";

const ALERTS: AlertItem[] = [
  { id: "1", type: "warning", message: "Event spike detected on /checkout endpoint", time: "2m ago" },
  { id: "2", type: "success", message: "Model retrain completed — accuracy +2.1%", time: "8m ago" },
  { id: "3", type: "info", message: "New integration connected: Snowflake", time: "15m ago" },
  { id: "4", type: "error", message: "Data pipeline latency exceeded 200ms threshold", time: "22m ago" },
];

const TOP_SOURCES = [
  { source: "Organic Search", sessions: 18420, share: 42 },
  { source: "Direct", sessions: 12830, share: 29 },
  { source: "Referral", sessions: 7210, share: 16 },
  { source: "Social Media", sessions: 4560, share: 10 },
  { source: "Email", sessions: 1290, share: 3 },
];

const alertIconMap = {
  warning: <AlertTriangle size={14} />,
  success: <CheckCircle2 size={14} />,
  info: <Info size={14} />,
  error: <AlertTriangle size={14} />,
};

const alertColorMap = {
  warning: "yellow",
  success: "teal",
  info: "blue",
  error: "red",
};

/**
 * Full interactive demo analytics dashboard
 */
export function DemoDashboard() {
  const t = useTranslations("demo");
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<ReturnType<typeof generateRevenueData>>([]);
  const [liveMetrics, setLiveMetrics] = useState<DashboardMetric[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Simulate data loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRevenueData(generateRevenueData(12));
      setLiveMetrics([
        { id: "rev", label: t("revenue"), value: "$284,190", change: 12.4, trend: "up" },
        { id: "users", label: t("users"), value: "48,293", change: 8.1, trend: "up" },
        { id: "conv", label: t("conversion"), value: "3.24%", change: 0.4, trend: "up" },
        { id: "lat", label: t("latency"), value: "42ms", change: -8.2, trend: "down" },
      ]);
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timeout);
  }, [t]);

  // Simulate live updates
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setLiveMetrics((prev) =>
        prev.map((m) => {
          const delta = (Math.random() - 0.45) * 0.5;
          return {
            ...m,
            change: parseFloat((m.change + delta).toFixed(1)),
            trend: m.change + delta > 0 ? "up" : "down",
          };
        })
      );
      setLastRefresh(new Date());
    }, 4000);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <Box className={classes.wrapper}>
      <Container size="xl" py="4xl" pt="6xl">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Group justify="space-between" mb="xl" wrap="wrap" gap="sm">
            <Stack gap={4}>
              <Group gap="sm" align="center">
                <Title order={1} fz={{ base: 24, md: 32 }} fw={800} style={{ letterSpacing: "-0.02em" }}>
                  {t("title")}
                </Title>
                <Badge
                  variant="dot"
                  color="teal"
                  size="sm"
                  className={classes.liveBadge}
                >
                  LIVE
                </Badge>
              </Group>
              <Text fz="sm" c="dimmed">
                {t("subtitle")}
              </Text>
            </Stack>

            <Group gap="xs">
              <ThemeIcon variant="subtle" color="gray" size="sm">
                <RefreshCw size={14} className={loading ? classes.spinning : ""} />
              </ThemeIcon>
              <Text fz="xs" c="dimmed">
                Updated {lastRefresh.toLocaleTimeString()}
              </Text>
            </Group>
          </Group>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
                {Array.from({ length: 4 }, (_, i) => (
                  <Card key={i} className={classes.skeletonCard} />
                ))}
              </SimpleGrid>
              <Group justify="center" mt="4xl">
                <Loader size="sm" color="indigo" />
                <Text fz="sm" c="dimmed">
                  Initializing intelligence layer...
                </Text>
              </Group>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard content */}
        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Metric Cards */}
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
                {liveMetrics.map((metric, i) => (
                  <MetricCard key={metric.id} metric={metric} index={i} />
                ))}
              </SimpleGrid>

              {/* Charts row */}
              <SimpleGrid cols={{ base: 1, lg: 2 }} mb="lg" spacing="lg">
                {/* Revenue chart */}
                <Card className={classes.chartCard}>
                  <Text fw={600} fz="sm" mb="md">
                    {t("revenueChart")}
                  </Text>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(255,255,255,0.2)" />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        stroke="rgba(255,255,255,0.2)"
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#13131f",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 10,
                          fontSize: 12,
                        }}
                        formatter={(v: number) => [formatCurrency(v), "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                {/* Events chart */}
                <Card className={classes.chartCard}>
                  <Text fw={600} fz="sm" mb="md">
                    {t("eventsChart")}
                  </Text>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={revenueData.slice(-7)} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(255,255,255,0.2)" />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        stroke="rgba(255,255,255,0.2)"
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#13131f",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 10,
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} opacity={0.8} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </SimpleGrid>

              {/* Bottom row */}
              <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
                {/* Traffic sources */}
                <Card className={classes.chartCard}>
                  <Text fw={600} fz="sm" mb="lg">
                    {t("topSources")}
                  </Text>
                  <Stack gap="sm">
                    {TOP_SOURCES.map((src) => (
                      <Box key={src.source}>
                        <Group justify="space-between" mb={4}>
                          <Text fz="sm">{src.source}</Text>
                          <Text fz="sm" fw={600} c="dimmed">
                            {src.sessions.toLocaleString()}
                          </Text>
                        </Group>
                        <Progress
                          value={src.share}
                          size="sm"
                          radius="xl"
                          color="indigo"
                        />
                      </Box>
                    ))}
                  </Stack>
                </Card>

                {/* Alerts */}
                <Card className={classes.chartCard}>
                  <Text fw={600} fz="sm" mb="lg">
                    {t("recentAlerts")}
                  </Text>
                  <Stack gap="sm">
                    {ALERTS.map((alert) => (
                      <Alert
                        key={alert.id}
                        icon={alertIconMap[alert.type]}
                        color={alertColorMap[alert.type]}
                        radius="md"
                        p="sm"
                      >
                        <Group justify="space-between" wrap="nowrap">
                          <Text fz="xs" lh={1.5}>
                            {alert.message}
                          </Text>
                          <Text fz="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
                            {alert.time}
                          </Text>
                        </Group>
                      </Alert>
                    ))}
                  </Stack>
                </Card>
              </SimpleGrid>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
