"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagInput from "./_components/TagInput";
import { useClients } from "@/context/client-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().email(),
  phone: z
    .string()
    .min(6, "Enter a Phone number ")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  createdAt: z.date(),
  tags: z.array(z.string()).optional(),
  activityHistory: z
    .array(
      z.object({
        date: z.date(),
        description: z.string().min(3),
      })
    )
    .optional(),
});

export default function AddPage() {
  const { tags, postClient } = useClients();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuidv4(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      createdAt: new Date(),
      tags: [...tags],
      activityHistory: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    postClient(values);
    toast.success("Client successfully added!");
    router.push("/dashboard/clients");
  }
  return (
    <main className="w-full md:w-1/2 p-5 mx-auto bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm ">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Add New Client</h1>
        <p className="text-muted-foreground text-sm">
          Fill in the details to create a new client profile.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="next@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a valid professional email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+212600000000" {...field} />
                </FormControl>
                <FormDescription>
                  Include country code if necessary (e.g. +212600000000).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="md:col-span-1 lg:col-span-2 xl:col-span-3">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Add keywords to categorize this client.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
