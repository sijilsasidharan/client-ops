"use client";

import { useEffect, useState } from "react";
import LoginPage from "./login/page";
import { getToken } from "@/lib/auth";
import AppSidenav from "@/components/app-sidenav";

export default function Home({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      {/* <h1>Client Ops</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {health ? (
        <p>
          Backend status: {health.status} · Database: {health.db}
        </p>
      ) : (
        <p>Checking backend…</p>
      )} */}
      {isLoggedIn === true ? (
        <AppSidenav>{children}</AppSidenav>
      ) : (
        <LoginPage />
      )}
    </main>
  );
}
