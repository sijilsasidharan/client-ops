"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [health, setHealth] = useState<{ status: string; db: string } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
      .then((res) => res.json())
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Client Ops</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {health ? (
        <p>
          Backend status: {health.status} · Database: {health.db}
        </p>
      ) : (
        <p>Checking backend…</p>
      )}
    </main>
  );
}
