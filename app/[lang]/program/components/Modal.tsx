import dictionaries, {
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import { useParams } from "next/navigation";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { StationIcon } from "@/app/components/StationIcon";
import ExportedImage from "next-image-export-optimizer";
import WebIcon from "@/app/icons/web";
import YoutubeIcon from "@/app/icons/youtube";
import Flag from "@/app/icons/flag";
import TwitterIcon from "@/app/icons/twitter";
import LinkedinIcon from "@/app/icons/linkedin";

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
  subheading,
  twitter,
  web,
  youtube,
}: PropsWithChildren<Presenter & { headerBg?: string }>) => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        {children}
      </div>
      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/70" />
          <div
            className="fixed inset-0 z-50 flex animate-[fadeIn_150ms] items-end overflow-y-auto md:items-center md:justify-center"
            onClick={() => setShowModal(false)}
          >
            {/* Close button */}
            <button
              className="bg-accent font-display hover:bg-primary fixed top-4 right-4 z-50 flex h-12 w-12 items-center justify-center text-2xl font-black text-black transition-all hover:-rotate-12 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <div
              className="my-4 max-h-[calc(100vh-2rem)] w-full overflow-y-auto md:w-auto md:max-w-2xl xl:max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
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
                    {name}
                  </h3>
                )}
                {subheading && modalProps?.showSubheading !== false && (
                  <p className="mt-2 text-base text-black/70">{subheading}</p>
                )}
              </div>

              {/* Schedule badges strip */}
              {schedule.length > 0 && (
                <div className="flex flex-wrap items-stretch justify-center border-y-4 border-black bg-black">
                  {schedule.map((item, idx) => {
                    const day =
                      lang.programDays[
                        item.day as keyof typeof lang.programDays
                      ].name;
                    return (
                      <div
                        className="flex items-center gap-3 border-r border-white/10 px-6 py-3 text-white last:border-r-0"
                        key={idx}
                      >
                        <div className="text-accent">
                          <StationIcon station={item.track} />
                        </div>
                        <div>
                          <div className="font-display text-sm font-black uppercase">
                            {
                              lang.programCategory[
                                item.track as keyof typeof lang.programCategory
                              ]
                            }
                          </div>
                          <div className="text-sm text-white/70">
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
                {talkLang && (
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
                    <p className="text-base leading-relaxed">{bio}</p>
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
