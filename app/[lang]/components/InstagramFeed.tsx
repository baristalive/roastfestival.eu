"use client";
import { Fragment, useEffect, useState } from "react";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";
import { useParams } from "next/navigation";

import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import CarouselIcon from "@/app/icons/carousel";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import VideoIcon from "@/app/icons/video";
import { app } from "@/app/utils/firebase";
import { PATTERNS } from "@/app/utils/consts";

const LIMIT = 7;

const INSTAGRAM_PARAMS = new URLSearchParams({
  fields: "media_url,permalink,media_type,thumbnail_url,caption",
  limit: LIMIT.toString(),
});

const INSTAGRAM_URLS = [
  "https://graph.instagram.com/me/stories",
  "https://graph.instagram.com/me/media",
];

type InstagramMediaType = "CAROUSEL_ALBUM" | "IMAGE" | "VIDEO";
type InstagramPost = {
  media_url: string;
  media_type: InstagramMediaType;
  thumbnail_url: string;
  permalink: string;
  caption: string;
  id: string;
};

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

const ContentTile = (post: InstagramPost) => {
  const imageSrc =
    post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
  return (
    <a href={post.permalink} rel="external" target="_blank">
      <div className="img-overlay aspect-square w-full before:z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          className="absolute top-0 left-0 z-0 h-full w-full object-cover"
          alt={post.caption}
        />
        <div className="absolute top-3 right-3 z-20 text-xl text-white">
          <Badge type={post.media_type} />
        </div>
      </div>
    </a>
  );
};

export const InstagramFeed = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const [posts, setPosts] = useState([] as InstagramPost[]);
  const [igApiKey, setIgApiKey] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const remoteConfig = getRemoteConfig(app);

    fetchAndActivate(remoteConfig)
      .then(() => getValue(remoteConfig, "INSTAGRAM_API_KEY"))
      .then((c) => setIgApiKey(c.asString()));
  }, [igApiKey]);

  useEffect(() => {
    if (igApiKey === "") return;
    INSTAGRAM_PARAMS.set("access_token", igApiKey);

    Promise.all(
      INSTAGRAM_URLS.map((url) => fetch(`${url}?${INSTAGRAM_PARAMS}`)),
    )
      .then((rawResponses) =>
        Promise.all(rawResponses.map((resp) => resp.json())),
      )
      .then((data) =>
        setPosts(
          data
            .map((d) => d?.data)
            .flat()
            .slice(0, LIMIT)
            .filter((d) => d !== undefined),
        ),
      );
  }, [igApiKey]);

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
        : Array(LIMIT)
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
