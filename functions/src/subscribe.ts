import { logger } from "firebase-functions";
import { CallableRequest, HttpsError } from "firebase-functions/https";
import { defineSecret, defineString } from "firebase-functions/params";

const ecomailApiKey = defineSecret("ECOMAIL_API_KEY");
const ecomailListId = defineString("ECOMAIL_LIST_ID");

interface EcomailSubscriberResponse {
  already_subscribed: boolean;
  id: number;
  inserted_at: string;
} // Environment parameters

/**
 * Subscribe email to Ecomail newsletter using API v2
 * @see https://ecomailczv2.docs.apiary.io/#reference/lists/list-subscribe/add-new-subscriber-to-list
 */
const subscribeToEcomail = async (
  email: string,
): Promise<{ message: string; success: boolean }> => {
  const listId = ecomailListId.value();
  const apiKey = ecomailApiKey.value();

  const response = await fetch(
    `https://api2.ecomailapp.cz/lists/${listId}/subscribe`,
    {
      body: JSON.stringify({
        skip_confirmation: true,
        subscriber_data: {
          email,
          source: "roastfestival.eu website",
        },
        trigger_autoresponders: true,
        update_existing: true,
      }),
      headers: {
        "Content-Type": "application/json",
        key: apiKey,
      },
      method: "POST",
    },
  );
  logger.info("Ecomail response", {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
  });

  if (!response.ok) {
    const errorText = await response.text();
    logger.error("Ecomail subscription failed", { error: errorText });
    throw new Error(
      `Ecomail subscription failed: ${response.status} - ${errorText}`,
    );
  }

  const data: EcomailSubscriberResponse = await response.json();
  logger.info("Ecomail response data:", {
    alreadySubscribed: data.already_subscribed,
    id: data.id,
    insertedAt: data.inserted_at,
  });

  return {
    message: data.already_subscribed
      ? "Email already subscribed"
      : "Successfully subscribed to newsletter",
    success: true,
  };
};

const subscribe = async (request: CallableRequest) => {
  if (!request.app) {
    throw new HttpsError(
      "failed-precondition",
      "App Check verification failed",
    );
  }
  logger.info("App check passed");

  const { email } = request.data as { email: string };

  if (!email || typeof email !== "string") {
    throw new HttpsError("invalid-argument", "Email is required");
  }

  logger.info("Email in payload, subscribing...");

  try {
    const result = await subscribeToEcomail(email);
    logger.info("Subscribed", { result });
    return result;
  } catch (error) {
    logger.error("Subscription error", { error });
    throw new HttpsError("internal", "Subscription failed");
  }
};
export default subscribe;
