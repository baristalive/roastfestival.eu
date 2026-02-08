"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import "./globals.css";
import { logger } from "./lib/monitoring";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);

    // Also log using our logger
    logger.error("GlobalError caught an error", error, {
      component: "GlobalError",
      metadata: {
        digest: error.digest,
      },
      operation: "error_boundary",
    });
  }, [error]);

  return (
    <html lang="cs">
      <body>
        <div className="bg-primary relative flex min-h-screen flex-col items-center justify-center">
          <div className="z-10 container flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="font-display mb-4 text-2xl font-black text-black uppercase md:text-8xl">
              Něco se pokazilo
            </div>
            <div className="text-palette-beige mb-8 text-lg">
              Omlouváme se, ale došlo k neočekávané chybě. Zkuste prosím obnovit
              stránku.
            </div>
            <div className="flex w-full gap-8">
              <button
                onClick={() => reset()}
                className="bg-accent pop-shadow punk-border flex-1 px-4 py-2 font-medium text-black transition-colors"
              >
                Zkusit znovu
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-palette-beige punk-border bg-secondary flex-1 px-4 py-2 font-medium text-black transition-colors hover:bg-white/50"
              >
                Obnovit stránku
              </button>
            </div>
          </div>
          {error.message && (
            <div className="mt-4 h-full w-full grow bg-black p-3">
              <p className="text-secondary font-mono text-sm">
                {error.message}
              </p>
            </div>
          )}
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
