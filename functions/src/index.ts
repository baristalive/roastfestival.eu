import { onCall } from "firebase-functions/https";
import subscribeFunc from "./subscribe";

/**
 * Callable function for newsletter subscription
 * - Uses Firebase App Check with reCAPTCHA Enterprise for bot protection
 * - App Check token is automatically verified by Firebase
 */
export const subscribe = onCall(
  {
    enforceAppCheck: true,
  },
  subscribeFunc,
);
