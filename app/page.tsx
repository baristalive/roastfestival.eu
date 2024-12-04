"use client";

import { redirect } from "next/navigation";

function RedirectPage() {
  // Make sure we're in the browser
  if (typeof window !== "undefined") {
    redirect("/cz");
  }
}

export default RedirectPage;
