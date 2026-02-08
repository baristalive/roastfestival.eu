import * as Sentry from "@sentry/node";
import { defineSecret } from "firebase-functions/params";

export const sentryDsn = defineSecret("SENTRY_DSN");

let isInitialized = false;

export const initSentry = () => {
  if (isInitialized) return;

  const dsn = sentryDsn.value();
  if (!dsn) {
    console.warn(
      "SENTRY_DSN secret is not set, Sentry will not be initialized",
    );
    return;
  }

  Sentry.init({
    dsn,
    sendDefaultPii: true,
  });

  isInitialized = true;
};

export { Sentry };
