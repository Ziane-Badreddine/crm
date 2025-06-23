"use client";

import { Client } from "@/types/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, User } from "lucide-react";

export default function CardClient({ client }: { client: Client }) {
  return (
    <Card className="w-full col-span-2 md:col-span-1  ">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Core client details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground ">
              Name:
            </span>
            <span className="text-sm font-medium">
              {client?.firstName} {client?.lastName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground " />
            <span className="text-sm break-all">{client.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground " />
            <span className="text-sm">{client.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground " />
            <span className="text-sm">
              Added {client.createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      {client.tags && client.tags.length > 0 && (
        <CardFooter className="pt-4 border-t">
          <div className="w-full">
            <div className="text-sm font-medium text-foreground mb-3">Tags</div>
            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="default"
                  className="text-xs px-2 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
