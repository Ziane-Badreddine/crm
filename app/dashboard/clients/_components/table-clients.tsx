"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Client } from "@/types/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClients } from "@/context/client-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  clients: Client[];
  sortName: boolean;
  setSortName: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TableClients({
  clients,
  sortName,
  setSortName,
}: Props) {
  const { deleteClient } = useClients();
  const router = useRouter();
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);

  return (
    <>
      <Table>
        <TableHeader className="bg-primary/50">
          <TableRow className="capitalize">
            <TableHead>
              <Button
                className="cursor-pointer"
                variant={sortName ? "default" : "ghost"}
                onClick={() => setSortName(!sortName)}
              >
                <ArrowDownUp />
                Name
              </Button>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className=" w-[180px]">Tags</TableHead>
            <TableHead className="w-[50px] text-left"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((c, i) => (
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      onClick={(e) => e.stopPropagation()}
                      asChild
                    >
                      <Button size="icon" variant="ghost">
                        <EllipsisVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={"/dashboard/clients/edit/" + c.id}>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDeleteId(c.id);
                        }}
                        className="text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

      <AlertDialog
        open={!!openDeleteId}
        onOpenChange={() => setOpenDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this client?</AlertDialogTitle>
            <AlertDialogDescription>
               This action is irreversible. The client and all associated data
                will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (openDeleteId) {
                  deleteClient(openDeleteId);
                  setOpenDeleteId(null);
                }
              }}
              className="bg-destructive text-white"
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
