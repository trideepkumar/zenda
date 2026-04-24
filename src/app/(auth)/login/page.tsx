"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (role: "user" | "delivery" | "admin") => {
    try {
      setLoading(true);
      const user = await api.auth.login(email || `${role}@example.com`, role);
      login(user);
      toast.success(`Logged in as ${role}`);
      
      if (role === "admin") router.push("/admin");
      else if (role === "delivery") router.push("/delivery");
      else router.push("/");
      
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login to Zenda</CardTitle>
          <CardDescription>
            Choose a role below to simulate login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Button onClick={() => handleLogin("user")} disabled={loading} variant="outline" className="w-full">
                Login as User
              </Button>
              <Button onClick={() => handleLogin("delivery")} disabled={loading} variant="outline" className="w-full">
                Login as Delivery Agent
              </Button>
              <Button onClick={() => handleLogin("admin")} disabled={loading} className="w-full">
                Login as Admin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
