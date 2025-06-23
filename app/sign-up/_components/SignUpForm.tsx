"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          Enter your details below to create your new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={() => {
            router.push("/dashboard");
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Username</Label>
              <Input
                placeholder="user"
                id="username"
                name="username"
                min={2}
                type="text"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="z@exemple.com"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" required />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit">Sign up</Button>
              <Button
              type="button"
                onClick={() => router.push("/dashboard")}
                variant={"outline"}
              >
                <Github />
                Login with Github
              </Button>
            </div>
            <div className="text-sm text-center">
              <span> Already have an account? </span>
              <Link
                className="text-sm text-primary hover:underline pb-[1px] underline-offset-1"
                href={"/login"}
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
