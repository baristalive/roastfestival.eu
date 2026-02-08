"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { useSectionTracking } from "@/app/hooks/useSectionTracking";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  /** Custom tracking name. Defaults to `id` if not provided. */
  trackingName?: string;
}

/**
 * Section component with built-in visibility tracking.
 * Tracks when the section enters/leaves the viewport for analytics.
 */
export const Section = ({
  children,
  id,
  trackingName,
  ...props
}: SectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const sectionName = trackingName ?? id ?? "";

  useSectionTracking(sectionName, ref);

  return (
    <section ref={ref} id={id} {...props}>
      {children}
    </section>
  );
};
