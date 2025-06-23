"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useClients } from "@/context/client-context";
import { MoveLeft, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Client } from "@/types/client";


export default function Nav({ client }: { client: Client }) {
  const { deleteClient } = useClients();


  return (
    <nav className="flex flex-col gap-4 rounded-lg border bg-sidebar p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-xl font-semibold">{`Client: ${client?.firstName} ${client?.lastName}`}</h1>
        <p className="text-muted-foreground text-sm">Client ID: {client.id}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 ">
        <Link
          href={`/dashboard/clients/edit/${client.id}`}
          aria-label="Edit client"
        >
          <Button>
            <Pencil />
            Edit
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" aria-label="Delete client">
              <Trash />
              Delete
            </Button>
          </AlertDialogTrigger>
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
              <AlertDialogAction asChild>
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    deleteClient(client.id);
                  }}
                >
                  Yes, delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Link href="/dashboard/clients" aria-label="Back to client list">
          <Button variant="outline">
            <MoveLeft />
            Back to Clients
          </Button>
        </Link>
      </div>
    </nav>
  );
}
