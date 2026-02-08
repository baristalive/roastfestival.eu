import * as admin from "firebase-admin";

import logger from "./utils/logger";

// Initialize Firebase Admin SDK (safe to call multiple times)
if (!admin.apps.length) {
  admin.initializeApp();
}

const INSTAGRAM_REFRESH_URL =
  "https://graph.instagram.com/refresh_access_token";
const REMOTE_CONFIG_PARAM = "INSTAGRAM_API_KEY";

interface InstagramTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

/**
 * Refresh Instagram long-lived access token
 * @see https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens
 */
const refreshInstagramAccessToken = async (
  currentToken: string,
): Promise<string> => {
  const url = new URL(INSTAGRAM_REFRESH_URL);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", currentToken);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorText = await response.text();
    logger.error("Instagram token refresh failed", undefined, {
      errorText,
      status: response.status,
    });
    throw new Error(
      `Instagram token refresh failed: ${response.status} - ${errorText}`,
    );
  }

  const data: InstagramTokenResponse = await response.json();
  logger.info("Instagram token refreshed", {
    expiresIn: data.expires_in,
    tokenType: data.token_type,
  });

  return data.access_token;
};

/**
 * Get current Instagram API key from Remote Config
 */
const getCurrentTokenFromRemoteConfig = async (): Promise<string> => {
  const remoteConfig = admin.remoteConfig();
  const template = await remoteConfig.getTemplate();

  const param = template.parameters[REMOTE_CONFIG_PARAM];
  if (!param || !("defaultValue" in param) || !param.defaultValue) {
    throw new Error(`Remote Config parameter ${REMOTE_CONFIG_PARAM} not found`);
  }

  const defaultValue = param.defaultValue;
  if (!("value" in defaultValue)) {
    throw new Error(
      `Remote Config parameter ${REMOTE_CONFIG_PARAM} has no value`,
    );
  }

  return defaultValue.value;
};

/**
 * Update Instagram API key in Remote Config
 */
const updateTokenInRemoteConfig = async (newToken: string): Promise<void> => {
  const remoteConfig = admin.remoteConfig();
  const template = await remoteConfig.getTemplate();

  template.parameters[REMOTE_CONFIG_PARAM] = {
    defaultValue: { value: newToken },
    description: "Instagram Graph API long-lived access token (auto-rotated)",
  };

  await remoteConfig.publishTemplate(template);
  logger.info("Remote Config updated with new Instagram token");
};

/**
 * Main function to rotate Instagram API token
 * 1. Get current token from Remote Config
 * 2. Refresh the token using Instagram API
 * 3. Save the new token back to Remote Config
 */
const refreshInstagramToken = async () => {
  logger.info("Starting Instagram token rotation");

  const currentToken = await getCurrentTokenFromRemoteConfig();
  logger.info("Retrieved current token from Remote Config");

  const newToken = await refreshInstagramAccessToken(currentToken);
  logger.info("Successfully refreshed token with Instagram API");

  await updateTokenInRemoteConfig(newToken);
  logger.info("Successfully updated token in Remote Config");
};

export default refreshInstagramToken;
