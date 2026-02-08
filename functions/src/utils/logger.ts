/**
 * Unified logger for Firebase Cloud Functions
 * Logs to both Firebase (Cloud Logging) and Sentry
 */

import { logger as firebaseLogger } from "firebase-functions";

import { Sentry } from "./instrument";

type LogContext = Record<string, unknown>;

/**
 * Log debug message (Firebase only, not sent to Sentry)
 */
export const debug = (message: string, context?: LogContext): void => {
  firebaseLogger.debug(message, context);
};

/**
 * Log informational message
 * Sent to Firebase and added as Sentry breadcrumb
 */
export const info = (message: string, context?: LogContext): void => {
  firebaseLogger.info(message, context);

  Sentry.addBreadcrumb({
    category: "log",
    data: context,
    level: "info",
    message,
  });
};

/**
 * Log warning message
 * Sent to Firebase and captured by Sentry
 */
export const warn = (message: string, context?: LogContext): void => {
  firebaseLogger.warn(message, context);

  Sentry.captureMessage(message, {
    contexts: { custom: context },
    level: "warning",
  });
};

/**
 * Log error message
 * Sent to Firebase and captured by Sentry
 */
export const error = (
  message: string,
  err?: Error | unknown,
  context?: LogContext,
): void => {
  firebaseLogger.error(message, { ...context, error: err });

  if (err instanceof Error) {
    Sentry.captureException(err, {
      contexts: { custom: context },
    });
  } else {
    Sentry.captureMessage(message, {
      contexts: { custom: { ...context, error: err } },
      level: "error",
    });
  }
};

export const logger = { debug, error, info, warn };
export default logger;
