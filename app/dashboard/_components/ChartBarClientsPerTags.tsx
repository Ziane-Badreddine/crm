"use client";

import { Tag } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useClients } from "@/context/client-context";

export function ChartBarClientsPerTags() {
  const { clients, tags } = useClients();

  const chartData = tags
    .map((tag) => {
      const clientsCount = clients.filter((client) =>
        client.tags?.includes(tag)
      ).length;

      return { tag, clients: clientsCount };
    })
    .sort((a, b) => a.clients - b.clients);

  const chartConfig = {
    tag: {
      label: "Tag",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const totalClientsWithTags = clients.filter(
    (client) => client.tags!.length > 0
  ).length;
  const mostPopularTag =
    chartData.length > 0 ? chartData[chartData.length - 1] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients per Tag</CardTitle>
        <CardDescription>Number of clients categorized by tag</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="tag"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="clients" fill="var(--color-tag)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {mostPopularTag && (
            <>
              Most popular: {mostPopularTag.tag} ({mostPopularTag.clients}{" "}
              clients)
              <Tag className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="text-muted-foreground leading-none">
          {totalClientsWithTags} of {clients.length} clients have tags assigned
        </div>
      </CardFooter>
    </Card>
  );
}
