"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { subscribe } from "@/app/utils/firebase";
import DoubleTickIcon from "@/app/icons/doubletick";
import InstagramFeed from "../components/InstagramFeed";
import {
  logger,
  MetricEvent,
  metrics,
  OperationType,
  performance,
} from "@/app/lib/monitoring";
import z, { ZodError } from "zod";
import { Section } from "@/app/components/Section";

const FormSchema = z.object({
  email: z.email(),
});
export const StayTuned = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formStartTime, setFormStartTime] = useState<number | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Track form start on first interaction
    if (formStartTime === null && value !== "") {
      setFormStartTime(Date.now());
      metrics.track(MetricEvent.NEWSLETTER_FORM_STARTED, {
        component: "newsletter",
      });
    }
  };

  // Track form abandonment when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Only track abandonment if form was started but not submitted
      if (formStartTime !== null && status !== "success") {
        const timeSpentMs = Date.now() - formStartTime;

        metrics.trackNewsletterAbandonment({
          completionPercentage: email !== "" ? 100 : 0,
          component: "newsletter",
          formName: "newsletter",
          lastField: email !== "" ? "email" : undefined,
          timeSpentMs,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formStartTime, status, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      FormSchema.parse({ email });
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((e) => e.message).join(", ");
        metrics.trackNewsletterValidationError(
          "email",
          "validation_error",
          message,
        );
        logger.warn("Newsletter submission failed", {
          component: "newsletter",
          metadata: { fields: "email", message },
        });
        setStatus("error");
        return;
      } else {
        setStatus("error");
        throw error;
      }
    }

    setStatus("loading");
    metrics.track(MetricEvent.NEWSLETTER_FORM_SUBMITTED, {
      component: "newsletter",
    });
    const {
      data: { message, success },
    } = await performance.measureAsync(
      OperationType.SUBSCRIBE,
      "submit_newsletter",
      async () => {
        return await subscribe({ email });
      },
      {
        component: "newsletter",
      },
    );

    if (!success) {
      const error = new Error(message);
      logger.error("Newsletter subscription failed", error, {
        component: "newsletter",
        operation: "submit_newsletter",
      });
      metrics.trackNewsletterSubmission(false, {
        component: "newsletter",
        errorMessage: message,
      });
      setStatus("error");
      throw error;
    }

    logger.info("Subscribed to newsletter", {
      component: "newsletter",
      operation: "submit_newsletter",
    });
    setStatus("success");
    setEmail("");
  };

  return (
    <Section id="stay-tuned" className="bg-lines bg-white pb-16 lg:pb-24">
      <div className="container mx-auto flex flex-col gap-8 px-6">
        <div className="flex flex-col items-center text-center">
          <p className="font-display mb-2 text-2xl font-bold tracking-wider text-black uppercase md:text-3xl">
            {lang.stayTuned.title}
          </p>
          <p className="mb-10 text-base text-black/70 md:text-lg">
            {lang.stayTuned.subtitle}
          </p>

          <div className="flex w-full max-w-xl flex-col gap-8 lg:gap-6">
            {/* Newsletter signup */}
            <div className="flex flex-1 flex-col gap-4">
              {status === "success" ? (
                <div className="punk-border pop-shadow flex items-center justify-center gap-4 bg-white">
                  <div className="h-12 w-12 text-black">
                    <DoubleTickIcon />
                  </div>
                  <p className="font-display py-3 text-base font-medium text-black uppercase">
                    {lang.stayTuned.successMessage}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="punk-border pop-shadow flex overflow-hidden bg-white"
                >
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder={lang.stayTuned.emailPlaceholder}
                    disabled={status === "loading"}
                    className="flex-1 bg-transparent px-4 py-3 text-base font-medium text-black outline-none placeholder:text-black/50 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-primary hover:bg-primary/90 font-display cursor-pointer px-6 py-3 text-sm font-bold tracking-wider text-white uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "loading" ? "..." : lang.stayTuned.subscribe}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">
                  {lang.stayTuned.errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="aspect-square w-full cursor-pointer md:hidden">
          <InstagramFeed />
        </div>
      </div>
    </Section>
  );
};
