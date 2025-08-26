"use client";

import { handleVincentAuth, redirectToVincentConnect } from "../lib/vincent-auth";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const { isAuthenticated } = handleVincentAuth();
    if (isAuthenticated) {
      setStatus("Authenticated. Redirecting...");
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } else {
      setStatus("Not authenticated. Redirecting to Vincent connect...");
      setTimeout(() => redirectToVincentConnect(`${window.location.origin}/login`), 500);
    }
  }, []);

  return (
    <main style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <p>{status}</p>
    </main>
  );
}

