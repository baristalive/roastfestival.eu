"use client";

import Link from "next/link";
import { useEffect } from "react";
import { error } from "./lib/monitoring/core/logger";

export default function NotFound() {
  useEffect(() => {
    error("Page not found", undefined, {
      component: "not_found",
      operation: "page_not_found",
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="bg-primary relative flex min-h-screen flex-1 items-center justify-center">
        <div className="z-10 container px-6 text-center">
          <div className="mx-auto mb-8 h-48 w-48"></div>
          <div className="font-display mb-4 text-2xl font-black text-black uppercase md:text-4xl">
            Stránka nebyla nalezena
          </div>
          <p className="text-palette-beige/70 mb-8 text-lg">
            Omlouváme se, ale stránka, kterou hledáte, neexistuje.
          </p>
          <Link
            href="/"
            className="bg-accent pop-shadow punk-border tex-black inline-block px-8 py-3 font-medium transition-colors"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  );
}
