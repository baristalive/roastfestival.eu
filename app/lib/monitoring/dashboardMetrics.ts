/**
 * Dashboard-specific metrics utilities for tracking business metrics with gauge metrics.
 * Provides helpers for tracking RSVP statistics, user engagement, and system health.
 */

import { setGauge } from "./core/performance";

/**
 * Track total caffeine level counts
 */
export function trackCaffeineLevel(count: number): void {
  setGauge("caffeine_level", count);
}
