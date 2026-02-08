/**
 * Shared types for the monitoring system
 */

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export interface LogContext {
  [key: string]: unknown;
  component?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  operation?: string;
  userId?: string;
}

export enum OperationType {
  SUBSCRIBE = "subscribe.submit",
}

export interface PerformanceContext {
  component?: string;
  metadata?: Record<string, unknown>;
  userId?: string;
}

export enum MetricEvent {
  // Newsletter subscription Events
  NEWSLETTER_FORM_STARTED = "newsletter.form.started",
  NEWSLETTER_FORM_SUBMITTED = "newsletter.form.submitted",
  NEWSLETTER_FORM_ABANDONED = "newsletter.form.abandoned",

  NEWSLETTER_SUBMISSIONS = "newsletter.submissions",
  NEWSLETTER_SUBMISSIONS_SUCCESS = "newsletter.submissions.success",
  NEWSLETTER_SUBMISSIONS_FAILURE = "newsletter.submissions.failure",

  NEWSLETTER_VALIDATION_ERROR = "newsletter.validation.error",
  // User Engagement Events
  PAGE_VIEW = "page.view",
  SECTION_VIEWED = "section.viewed",
}

export interface MetricData {
  [key: string]: string | number | boolean | undefined;
  component?: string;
  timestamp?: number;
  userId?: string;
}

export interface ValidationErrorData extends MetricData {
  errorMessage: string;
  errorType: string;
  field: string;
}

export interface FormAbandonmentData extends MetricData {
  completionPercentage: number;
  formName: string;
  lastField?: string;
  timeSpentMs: number;
}
