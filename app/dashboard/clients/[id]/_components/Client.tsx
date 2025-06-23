"use client";

import { useClients } from "@/context/client-context";
import Nav from "./Nav";
import CardClient from "./CardClient";
import { redirect } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function Client({ id }: { id: string }) {
  const { clients } = useClients();
  const client = clients.find((c) => c.id === id);

  if (!client) redirect("/dashboard/clients");
  return (
    <>
      <Nav client={client!} />
      <div className="w-full   grid grid-cols-2 md:grid-cols-3 gap-5">
        <CardClient client={client!} />

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>
              A summary of client-related events and actions.
            </CardDescription>
            <CardAction>
                <Button size={"icon"}>
                    {client.activityHistory?.length}
                </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[50vh] ">
              {client.activityHistory?.map((a, i) => (
                <div className="grid gap-4 py-4 " key={i}>
                  <div className="flex flex-col border-l border-primary px-5">
                    <span className="text-sm text-primary">
                      {new Date(a.date).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <p className="break-words text-muted-foreground">{a.description}</p>
                  </div>
                  {i < client.activityHistory!.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
