import { onCall, onRequest } from "firebase-functions/https";
import { onSchedule } from "firebase-functions/scheduler";

import { initSentry, sentryDsn } from "./utils/instrument";
import refreshInstagramTokenFunc from "./refreshInstagramToken";
import subscribeFunc from "./subscribe";

/**
 * Callable function for newsletter subscription
 * - Uses Firebase App Check with reCAPTCHA Enterprise for bot protection
 * - App Check token is automatically verified by Firebase
 */
export const subscribe = onCall(
  {
    enforceAppCheck: true,
    secrets: ["ECOMAIL_API_KEY", sentryDsn],
  },
  (request) => {
    initSentry();
    return subscribeFunc(request);
  },
);

/**
 * Scheduled function to rotate Instagram API token
 * - Runs every 2 weeks (tokens expire in 60 days)
 * - Refreshes token and updates Remote Config
 */
export const refreshInstagramTokenScheduled = onSchedule(
  {
    schedule: "0 3 1,15 * *", // Run at 3:00 AM on the 1st and 15th of each month
    secrets: [sentryDsn],
    timeZone: "Europe/Prague",
  },
  () => {
    initSentry();
    return refreshInstagramTokenFunc();
  },
);

/**
 * HTTP endpoint to manually trigger Instagram token rotation (development only)
 * - Only enabled when running in the emulator
 * - Use for testing: curl http://localhost:5001/{project}/us-central1/refreshInstagramToken
 */
export const refreshInstagramToken = onRequest(async (_req, res) => {
  // Only allow in emulator/development environment
  if (process.env.FUNCTIONS_EMULATOR !== "true") {
    res.status(403).json({
      error: "This endpoint is only available in development",
      success: false,
    });
    return;
  }

  try {
    await refreshInstagramTokenFunc();
    res.json({
      message: "Instagram API token rotated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      success: false,
    });
  }
});
