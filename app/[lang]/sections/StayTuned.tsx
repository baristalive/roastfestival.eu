"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import InstagramIcon from "@/app/icons/instagram";
import { subscribe } from "@/app/utils/firebase";
import DoubleTickIcon from "@/app/icons/doubletick";

export const StayTuned = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await subscribe({ email });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="stay-tuned" className="bg-lines bg-white pb-16 lg:pb-24">
      <div className="container mx-auto px-6">
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
                    Thanks for subscribing!
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
                    onChange={(e) => setEmail(e.target.value)}
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
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

            <a
              href={lang.contacts.instagram}
              target="_blank"
              rel="external"
              title="Instagram"
              className="text-primary group flex items-center justify-center gap-3 px-6 py-3 transition-colors"
            >
              <span className="h-12 w-12 transition-transform group-hover:scale-110">
                <InstagramIcon />
              </span>
              <span className="font-display text-sm font-bold tracking-wider uppercase">
                {lang.stayTuned.followUs}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
