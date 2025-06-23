"use client";
import DashboardCard from "./_components/DashboardCard";
import { BadgeCheck, ListChecks, UserPlus, Users } from "lucide-react";
import { useClients } from "@/context/client-context";
import { ChartBarClientsPerTags } from "./_components/ChartBarClientsPerTags";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { clients, totalActivities, totalClient } = useClients();
  const totalClientsNewThisMonth = clients.filter(
    (c) =>
      c.createdAt.getMonth() === new Date().getMonth() &&
      c.createdAt.getFullYear() === new Date().getFullYear()
  ).length;

  const totalClientsVIP = clients.filter((c) => c.tags?.includes("VIP")).length;
  const router = useRouter();

  return (
    <div className="w-screen  flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        <DashboardCard
          title="Total Clients"
          description="Number of clients in CRM"
          value={totalClient}
          icon={Users}
        />
        <DashboardCard
          title="New This Month"
          description="Clients added this month"
          value={totalClientsNewThisMonth}
          icon={UserPlus}
        />
        <DashboardCard
          title="Total Activities"
          description="All logged client interactions"
          value={totalActivities}
          icon={ListChecks}
        />
        <DashboardCard
          title="VIP Clients"
          description="High priority clients"
          value={totalClientsVIP}
          icon={BadgeCheck}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="w-full col-span-1 px-5">
          <ChartBarClientsPerTags />
        </div>
        <div className="w-full grid-cols-1 lg:col-span-2 p-5 md:py-0 ">
          <Table>
            <TableCaption>
              <Link href="/dashboard/clients" passHref>
                <Button variant="link" className="capitalize px-0">
                  View all clients
                </Button>
              </Link>
            </TableCaption>
            <TableHeader className="bg-primary/50">
              <TableRow className="capitalize">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className=" w-[180px]">Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length > 0 ? (
                clients.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 8).map((c, i) => (
                  <TableRow
                    key={c.id}
                    className={cn(i % 2 && "bg-sidebar", "hover:bg-primary/10")}
                    onClick={() => router.push(`/dashboard/clients/${c.id}`)}
                  >
                    <TableCell className="font-medium">{`${c.firstName} ${c.lastName}`}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell className="flex-1 flex-wrap gap-2  ">
                      {c.tags?.map((tag, i) => (
                        <Badge className="mr-2" key={i}>
                          {tag}
                        </Badge>
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    Aucun client trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
