"use client";
import { generateClients } from "@/lib/mockData";
import { Client } from "@/types/client";
import { createContext, useContext, useState, type ReactNode } from "react";

type clientContextType = {
  clients: Client[];
  postClient: (client: Client) => void;
  deleteClient: (clientId: string) => void;
  updateClient: (clientId: string, client: Client) => void;
  totalClient: number;
  totalActivities: number;
  tags: string[];
  startDate: Date;
  endDate: Date;
};

const ClientContext = createContext<clientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(generateClients());

  const postClient = (newClient: Client) => {
    setClients((prev) => {
      const existingClient = prev.find((client) => client.id === newClient.id);
      if (existingClient) {
        console.warn("Client with this ID already exists");
        return prev;
      } else {
        return [...prev, newClient];
      }
    });
  };

  const updateClient = (clientId: string, updatedClient: Client) => {
    setClients((prev) =>
      prev.map((client) => (client.id === clientId ? updatedClient : client))
    );
  };

  const deleteClient = (clientId: string) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
  };

  const totalClient = clients.length;
  const totalActivities = clients.reduce(
    (prev, curr) => (prev += curr.activityHistory!.length),
    0
  );

  const tags = Array.from(new Set(clients.flatMap((c) => c.tags || [])));

  const endDate = new Date(
    Math.max(...clients.map((c) => new Date(c.createdAt).getTime()))
  );
  const startDate = new Date(
    Math.min(...clients.map((c) => new Date(c.createdAt).getTime()))
  );



  return (
    <ClientContext.Provider
      value={{
        clients,
        postClient,
        deleteClient,
        updateClient,
        totalClient,
        totalActivities,
        tags,
        startDate,
        endDate,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClients must be used within a CartProvider");
  }
  return context;
}
