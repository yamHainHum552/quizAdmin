"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use the next/navigation module for client-side navigation

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page when the component is rendered on the client
    router.push("/login");
  }, [router]);

  return null; // Return nothing since this component only redirects
}
