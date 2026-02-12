"use client";
import { Fragment } from "react";
import { useParams } from "next/navigation";

import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import CarouselIcon from "@/app/icons/carousel";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import VideoIcon from "@/app/icons/video";
import { PATTERNS } from "@/app/utils/consts";
import {
  useInstagramFeed,
  INSTAGRAM_LIMIT,
  type InstagramMediaType,
  type InstagramPost,
} from "@/app/hooks/useInstagramFeed";

const Badge = ({ type }: { type: InstagramMediaType }) => {
  switch (type) {
    case "CAROUSEL_ALBUM":
      return <CarouselIcon />;
    case "VIDEO":
      return <VideoIcon />;
    default:
      return null;
  }
};

const ContentTile = (post: InstagramPost) => (
  <a href={post.permalink} rel="external" target="_blank">
    <div className="img-overlay aspect-square w-full before:z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.image_url}
        className="absolute top-0 left-0 z-0 h-full w-full object-cover"
        alt={post.caption}
      />
      <div className="absolute top-3 right-3 z-20 text-xl text-white">
        <Badge type={post.media_type} />
      </div>
    </div>
  </a>
);

export const InstagramFeed = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const posts = useInstagramFeed();

  return (
    <div className="animate-pop punk-border pop-shadow bg-primary grid grid-cols-3 text-center text-white">
      {posts.length > 0
        ? posts.map((p, idx) => (
            <Fragment key={p.id}>
              {idx === 4 && (
                <a
                  href={lang.contacts.instagram}
                  title="Instagram"
                  rel="external"
                  className="block aspect-square w-full p-6"
                  target="_blank"
                >
                  <InstagramIcon />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              <ContentTile {...p} />
            </Fragment>
          ))
        : Array(INSTAGRAM_LIMIT)
            .fill(0)
            .map((_, idx) => (
              <Fragment key={idx}>
                {idx === 4 && (
                  <a
                    href={lang.contacts.instagram}
                    title="Instagram"
                    rel="external"
                    className="block aspect-square w-full p-6"
                    target="_blank"
                  >
                    <InstagramIcon />
                    <span className="sr-only">Instagram</span>
                  </a>
                )}
                <div
                  className={`aspect-square w-full animate-pulse ${PATTERNS[idx % PATTERNS.length]} `}
                />
              </Fragment>
            ))}
      <a
        href={lang.contacts.facebook}
        title="Facebook"
        rel="external"
        className="bg-secondary block aspect-square w-full p-6"
        target="_blank"
      >
        <FacebookIcon />
        <span className="sr-only">Facebook</span>
      </a>
    </div>
  );
};

export default InstagramFeed;
