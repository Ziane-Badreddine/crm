"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClients } from "@/context/client-context";

export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
  tags?: string[];
  activityHistory?: Activity[];
};

export type Activity = {
  date: Date;
  description: string;
};

interface TagChartData {
  date: string;
  [key: string]: string | number;
}

export default function TagsAreaChart() {
  const [timeRange, setTimeRange] = React.useState("30d");
  const { clients } = useClients();

  // Fonction pour générer les données du graphique basées sur les tags
  const generateTagChartData = React.useMemo(() => {
    if (!clients || clients.length === 0) return [];

    // Obtenir la plage de dates
    const referenceDate = new Date();
    let daysToSubtract = 30;
    if (timeRange === "90d") {
      daysToSubtract = 90;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    // Collecter tous les tags uniques
    const allTags = new Set<string>();
    clients.forEach(client => {
      client.tags?.forEach(tag => allTags.add(tag));
    });

    const uniqueTags = Array.from(allTags).slice(0, 5); // Limiter à 5 tags max

    // Générer les données par jour
    const chartData: TagChartData[] = [];
    
    for (let d = new Date(startDate); d <= referenceDate; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      const dateString = currentDate.toISOString().slice(0, 10);
      
      const dayData: TagChartData = { date: dateString };
      
      // Compter les clients avec chaque tag créés jusqu'à cette date
      uniqueTags.forEach(tag => {
        const count = clients.filter(client => 
          client.tags?.includes(tag) && 
          new Date(client.createdAt) <= currentDate
        ).length;
        dayData[tag] = count;
      });
      
      chartData.push(dayData);
    }

    return chartData;
  }, [clients, timeRange]);

  // Configuration du graphique
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    
    if (!clients || clients.length === 0) return config;

    const allTags = new Set<string>();
    clients.forEach(client => {
      client.tags?.forEach(tag => allTags.add(tag));
    });

    const uniqueTags = Array.from(allTags).slice(0, 5);
    const colors = [
      "var(--chart-1)",
      "var(--chart-2)", 
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)"
    ];

    uniqueTags.forEach((tag, index) => {
      config[tag] = {
        label: tag,
        color: colors[index % colors.length],
      };
    });

    return config;
  }, [clients]);

  const uniqueTags = Object.keys(chartConfig);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Tags Distribution</CardTitle>
          <CardDescription>
            Client distribution by tags over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={generateTagChartData}>
            <defs>
              {uniqueTags.map((tag) => (
                <linearGradient key={tag} id={`fill${tag}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${tag})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${tag})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {uniqueTags.map((tag) => (
              <Area
                key={tag}
                dataKey={tag}
                type="monotone"
                fill={`url(#fill${tag})`}
                stroke={`var(--color-${tag})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}