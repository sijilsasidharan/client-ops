"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { clearToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    clearToken();
    queryClient.clear();
    router.replace("/login");
  };

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/clients" className="text-lg font-semibold">
          Client Ops
        </Link>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut />
          Log out
        </Button>
      </div>
    </header>
  );
}
