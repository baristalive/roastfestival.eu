import * as Sentry from "@sentry/node";
import { defineSecret, defineString } from "firebase-functions/params";

export const sentryDsn = defineSecret("SENTRY_DSN");
const sentryRelease = defineString("SENTRY_RELEASE");

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
    release: sentryRelease.value(),
    sendDefaultPii: true,
  });

  isInitialized = true;
};

export { Sentry };
