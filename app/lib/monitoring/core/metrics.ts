/**
 * Custom metrics tracking system for business and user analytics.
 * Tracks events, user behavior, and business metrics.
 *
 * IMPORTANT: Use this module for event tracking and business metrics.
 * For performance measurement, use the performance module.
 * For logging, use the logger module.
 */

import * as Sentry from "@sentry/nextjs";
import type {
  MetricEvent,
  MetricData,
  ValidationErrorData,
  FormAbandonmentData,
} from "../types";
import { MetricEvent as MetricEventEnum } from "../types";
import * as logger from "./logger";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Send event to Google Analytics (if initialized)
 * Uses dynamic imports to defer Firebase SDK loading until actually needed
 */
async function sendToGoogleAnalytics(
  event: MetricEvent,
  data?: MetricData,
): Promise<void> {
  // Dynamically import Firebase modules only when analytics is being sent
  const [{ getAnalyticsInstance }, { logEvent }] = await Promise.all([
    import("@/app/utils/firebase"),
    import("firebase/analytics"),
  ]);

  const analytics = getAnalyticsInstance();
  if (!analytics) return;

  // Convert event name to GA4 format (replace dots with underscores)
  const gaEventName = event.replace(/\./g, "_");

  // Filter out undefined values and ensure GA4-compatible params
  const params: Record<string, string | number | boolean> = {};
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        params[key] = value;
      }
    }
  }

  logEvent(analytics, gaEventName, params);
}

/**
 * Track a metric event
 */
export function track(event: MetricEvent, data?: MetricData): void {
  const enrichedData: MetricData = {
    ...data,
    timestamp: Date.now(),
  };

  // Log in development
  if (isDevelopment) {
    logger.debug(`Metric: ${event}`, enrichedData);
    return;
  }

  // Send to Google Analytics
  sendToGoogleAnalytics(event, enrichedData);

  // Add to Sentry breadcrumb for production
  Sentry.addBreadcrumb({
    category: "metric",
    data: enrichedData,
    level: "info",
    message: event,
  });
}

/**
 * Track RSVP form submission
 */
export function trackNewsletterSubmission(
  success: boolean,
  data?: MetricData,
): void {
  const event = MetricEventEnum.NEWSLETTER_FORM_SUBMITTED;
  track(event, { ...data, success });

  // Record counter metrics
  if (isDevelopment) {
    return;
  }
  Sentry.metrics.count(MetricEventEnum.NEWSLETTER_SUBMISSIONS, 1);

  if (success) {
    Sentry.metrics.count(MetricEventEnum.NEWSLETTER_SUBMISSIONS_SUCCESS, 1);
  } else {
    Sentry.metrics.count(MetricEventEnum.NEWSLETTER_SUBMISSIONS_FAILURE, 1);
  }
}

/**
 * Track validation error
 */
export function trackNewsletterValidationError(
  field: string,
  errorType: string,
  errorMessage: string,
): void {
  const data: ValidationErrorData = {
    errorMessage,
    errorType,
    field,
  };

  track(MetricEventEnum.NEWSLETTER_VALIDATION_ERROR, data);

  // Record counter for validation errors
  if (!isDevelopment) {
    Sentry.metrics.count(MetricEventEnum.NEWSLETTER_VALIDATION_ERROR, 1);
  }
}

/**
 * Track form abandonment
 */
export function trackNewsletterAbandonment(
  formData: FormAbandonmentData,
): void {
  track(MetricEventEnum.NEWSLETTER_FORM_ABANDONED, formData);

  logger.info("Newsletter form abandoned", {
    component: formData.formName,
    metadata: {
      completionPercentage: formData.completionPercentage,
      lastField: formData.lastField,
      timeSpentMs: formData.timeSpentMs,
    },
  });
}

/**
 * Track page view
 */
export function trackPageView(path: string, metadata?: MetricData): void {
  track(MetricEventEnum.PAGE_VIEW, {
    ...metadata,
    path,
  });
}

/**
 * Track section viewed (scroll into view)
 */
export function trackSectionView(
  sectionName: string,
  metadata?: MetricData,
): void {
  track(MetricEventEnum.SECTION_VIEWED, {
    ...metadata,
    section: sectionName,
  });
}
