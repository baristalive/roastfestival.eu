import dictionaries, {
  Presenter,
  SupportedLanguages,
  Track,
} from "@/app/dictionaries/all";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import { useParams } from "next/navigation";
import InlineMarkdown from "@/app/components/InlineMarkdown";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { StationIcon } from "@/app/components/StationIcon";
import ExportedImage from "next-image-export-optimizer";
import WebIcon from "@/app/icons/web";
import YoutubeIcon from "@/app/icons/youtube";
import Flag from "@/app/icons/flag";
import TwitterIcon from "@/app/icons/twitter";
import LinkedinIcon from "@/app/icons/linkedin";
import SpotifyIcon from "@/app/icons/spotify";

const SocialLink = ({
  href,
  icon,
  title,
}: {
  href: string | undefined;
  icon: ReactNode;
  title: string;
}) =>
  href ? (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="external"
      className="hover:bg-primary flex h-14 w-14 items-center justify-center overflow-hidden bg-black p-3.5 text-white transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-black)]"
    >
      {icon}
      <span className="sr-only">{title}</span>
    </a>
  ) : null;

export const Modal = ({
  actionIcons,
  annotation,
  bio,
  children,
  country,
  facebook,
  headerBg = "bg-primary bg-dots",
  instagram,
  lang: talkLang,
  linkedin,
  logo,
  modalProps,
  name,
  schedule,
  spotify,
  subheading,
  track,
  twitter,
  web,
  youtube,
}: PropsWithChildren<Presenter & { headerBg?: string; track: Track }>) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const cardRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    startY: number;
    startScroll: number;
    dragging: boolean;
  } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const dragOffsetRef = useRef(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !showModal) return;

    const onTouchStart = (e: TouchEvent) => {
      dragState.current = {
        dragging: false,
        startScroll: card.scrollTop,
        startY: e.touches[0].clientY,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const state = dragState.current;
      if (!state) return;

      const dy = e.touches[0].clientY - state.startY;

      if (!state.dragging) {
        if (dy > 0 && card.scrollTop <= 0) {
          state.dragging = true;
        } else {
          return;
        }
      }

      if (state.dragging) {
        e.preventDefault();
        const offset = Math.max(0, dy);
        dragOffsetRef.current = offset;
        setDragOffset(offset);
      }
    };

    const onTouchEnd = () => {
      const state = dragState.current;
      dragState.current = null;

      if (!state?.dragging) return;

      if (dragOffsetRef.current > 150) {
        setShowModal(false);
      }
      dragOffsetRef.current = 0;
      setDragOffset(0);
    };

    card.addEventListener("touchstart", onTouchStart);
    card.addEventListener("touchmove", onTouchMove, { passive: false });
    card.addEventListener("touchend", onTouchEnd);

    return () => {
      card.removeEventListener("touchstart", onTouchStart);
      card.removeEventListener("touchmove", onTouchMove);
      card.removeEventListener("touchend", onTouchEnd);
    };
  }, [showModal]);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        {children}
      </div>
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 transition-opacity"
            style={{ opacity: Math.max(0, 1 - dragOffset / 300) }}
          />
          <div
            className="fixed inset-0 z-50 flex animate-[fadeIn_150ms] items-end overflow-y-auto md:items-center md:justify-center"
            onClick={() => setShowModal(false)}
          >
            <div
              ref={cardRef}
              className="relative max-h-full w-full overflow-y-auto md:w-auto md:max-w-2xl xl:max-w-3xl"
              style={{
                transform:
                  dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
                transition: dragOffset > 0 ? "none" : "transform 0.2s ease-out",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle — mobile only */}
              <div className="flex items-center justify-center gap-1.5 bg-black py-2 md:hidden">
                <div className="h-0.5 w-3 bg-white/40" />
                <div className="h-0.5 w-3 bg-white/40" />
                <div className="h-0.5 w-3 bg-white/40" />
              </div>
              {/* Close button */}
              <button
                className="bg-accent font-display absolute top-3 right-3 z-10 flex h-12 w-12 items-center justify-center text-2xl font-black text-black transition-all hover:-rotate-12 hover:bg-black hover:text-white"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              {/* Top colored section — logo + name */}
              <div
                className={`${headerBg} px-6 pt-8 pb-8 text-center md:px-10`}
              >
                {logo && (
                  <div className="mb-4 flex justify-center">
                    <div className="relative inline-block">
                      <div
                        className={`pop-shadow-small inline-flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-black bg-white md:h-36 md:w-36 ${modalProps?.className !== undefined ? modalProps?.className : "p-4"}`}
                      >
                        <ExportedImage
                          src={`/images/promoted/${logo}`}
                          alt={name}
                          width={240}
                          height={240}
                        />
                      </div>
                      {country && (
                        <div className="pop-shadow-small absolute right-0 bottom-0 overflow-hidden rounded-full border-2 border-black">
                          <Flag country={country} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {modalProps?.showName !== false && (
                  <h3 className="font-display text-2xl font-black text-black uppercase md:text-4xl">
                    <InlineMarkdown>{name}</InlineMarkdown>
                  </h3>
                )}
                {subheading && modalProps?.showSubheading !== false && (
                  <p className="mt-2 text-base text-black/70">{subheading}</p>
                )}
              </div>

              {/* Schedule badges strip */}
              {schedule.length > 0 && (
                <div
                  className={`grid justify-center border-y-4 border-black bg-black ${schedule.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
                >
                  {schedule.map((item, idx) => {
                    const day =
                      lang.programDays[
                        item.day as keyof typeof lang.programDays
                      ].name;
                    const isCenteredLastItem =
                      schedule.length > 1 &&
                      schedule.length % 2 === 1 &&
                      idx === schedule.length - 1;
                    return (
                      <div
                        className={`flex items-center justify-center gap-2 px-2 py-3 text-white md:gap-3 md:px-6 ${
                          isCenteredLastItem ? "col-span-2" : ""
                        }`}
                        key={idx}
                      >
                        <div className="text-accent shrink-0">
                          <StationIcon station={item.track} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display truncate text-xs font-black uppercase md:text-sm">
                            {
                              lang.programCategory[
                                item.track as keyof typeof lang.programCategory
                              ]
                            }
                          </div>
                          <div className="truncate text-xs text-white/70 md:text-sm">
                            {day} {item.start} – {item.end}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Content section */}
              <div className="bg-white px-8 py-8 md:px-12">
                {![Track.Honor, Track.Espresso, Track.Filter].includes(track) &&
                  talkLang && (
                    <div className="border-primary bg-primary/10 mb-6 border-l-4 px-4 py-3 font-bold">
                      {lang.programTile.talkInLanguage[talkLang]}
                    </div>
                  )}

                {annotation && (
                  <div className="mb-6 text-base leading-relaxed md:text-lg">
                    {Array.isArray(annotation) ? (
                      annotation.map((p) => (
                        <p className="mb-4 last:mb-0" key={p}>
                          {p}
                        </p>
                      ))
                    ) : (
                      <p>{annotation}</p>
                    )}
                  </div>
                )}

                {bio && (
                  <div className="mb-6">
                    <h6 className="font-display mb-2 text-base font-black uppercase">
                      {subheading}
                    </h6>
                    <div className="text-base leading-relaxed">
                      {Array.isArray(bio) ? (
                        bio.map((paragraph) => (
                          <p className="mb-4 last:mb-0" key={paragraph}>
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p>{bio}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions + Social */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  {actionIcons &&
                    Object.entries(actionIcons).map(([k, v]) => (
                      <a
                        key={k}
                        href={v.href}
                        className="font-display bg-accent px-8 py-4 text-lg font-black text-black uppercase transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-black)]"
                        target="_blank"
                        rel="external"
                      >
                        {v.text}
                      </a>
                    ))}
                  <SocialLink href={web} title="Web" icon={<WebIcon />} />
                  <SocialLink
                    href={instagram}
                    title="Instagram"
                    icon={<InstagramIcon />}
                  />
                  <SocialLink
                    href={facebook}
                    title="Facebook"
                    icon={<FacebookIcon />}
                  />
                  <SocialLink
                    href={youtube}
                    title="YouTube"
                    icon={<YoutubeIcon />}
                  />
                  <SocialLink
                    href={spotify}
                    title="Spotify"
                    icon={<SpotifyIcon />}
                  />
                  <SocialLink
                    href={twitter}
                    title="X (Twitter)"
                    icon={<TwitterIcon />}
                  />
                  <SocialLink
                    href={linkedin}
                    title="LinkedIn"
                    icon={<LinkedinIcon />}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
