"use client";

import { useClients } from "@/context/client-context";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import TableClients from "./_components/table-clients";
import { Client } from "@/types/client";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagsSection from "./_components/TagsSection";

export default function ClientPage() {
  const { clients, tags } = useClients();

  const [search, setSearch] = useState("");
  const [filtreClients, setFiltreClients] = useState<Client[]>([]);
  const [sortName, setSortName] = useState(false);
  const [filtredTags, setFiltredTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    let result = clients.filter(
      (c) =>
        (!term ||
          [c.firstName + c.lastName, c.email, c.phone, c.id].some((field) =>
            field.toLowerCase().includes(term)
          )) &&
        filtredTags.every((tag) => c.tags?.includes(tag))
    );

    if (sortName) {
      result = [...result].sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
    }

    return result;
  }, [clients, search, filtredTags, sortName]);

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFiltreClients(filtered.slice(start, end));
  }, [filtered, page, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [search, filtredTags, sortName]);

  const pages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <main className="p-5 w-full">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
          <Input
            className="w-full md:w-1/2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search clients..."
            type="search"
          />

          <div className="flex flex-wrap items-center gap-2 md:justify-end w-full md:w-1/2">
            {filtredTags.length > 0 && (
              <Button
                className=" border"
                onClick={() => setFiltredTags([])}
                variant={"ghost"}
              >
                <X />
                rest
              </Button>
            )}
            <TagsSection
              tags={tags}
              filtredTags={filtredTags}
              setFiltredTags={setFiltredTags}
            />
          </div>
        </div>

        <TableClients
          sortName={sortName}
          setSortName={setSortName}
          clients={filtreClients}
        />

        <div className="flex flex-col md:flex-row items-center justify-between  gap-5 ">
          <div className="flex items-center justify-center gap-3 ">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-muted-foreground flex-1 text-sm">
                Rows per page
              </h1>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(v) => setItemsPerPage(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[8, 16, 24, 32, 40].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-muted-foreground flex-1 text-sm">
              Page {page} of {pages}.
            </div>
          </div>

          <div className="flex items-center justify-end  space-x-2 ">
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              variant="outline"
            >
              <MoveLeft />
              Previous
            </Button>
            <Button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              variant="outline"
            >
              Next
              <MoveRight />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
