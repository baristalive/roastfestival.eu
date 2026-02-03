"use client";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
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

const firebaseConfig = {
  apiKey: "AIzaSyCUzZ7UIBkSWiS8HGOvOGJU_neEJftyyy4",
  appId: "1:635139009990:web:936b1cd8582998e00056c7",
  authDomain: "roastfestival.firebaseapp.com",
  measurementId: "G-RGNDY5N337",
  messagingSenderId: "635139009990",
  projectId: "roastfestival",
  storageBucket: "roastfestival.appspot.com",
};
const app = initializeApp(firebaseConfig);

const LIMIT = 5;

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
      <div className="img-overlay h-64 w-64 before:z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          className="absolute top-0 left-0 z-0 h-full w-full rounded-2xl object-cover"
          alt={post.caption}
        />
        <div className="absolute top-3 right-3 z-20 text-xl text-(--white)">
          <Badge type={post.media_type} />
        </div>
      </div>
    </a>
  );
};

const ContentTileSkeleton = () => (
  <div className="h-64 w-64 animate-pulse rounded-2xl bg-slate-300" />
);

const InstagramFeed = () => {
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
    <section>
      <div className="mx-auto grid max-w-475 items-end gap-12 py-8 lg:grid-cols-[1fr,3fr] 2xl:gap-32">
        <div className="flex flex-col px-8 md:p-12">
          <h2 className="pt-24 pb-8 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.social.title}
          </h2>
          <div className="space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.social.text}
          </div>
          <div className="my-12 flex gap-4 text-sm md:text-xl 2xl:text-2xl">
            <a
              href={lang.contacts.instagram}
              title="Instagram"
              rel="external"
              className="nav"
              target="_blank"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href={lang.contacts.facebook}
              title="Facebook"
              rel="external"
              className="nav"
              target="_blank"
            >
              <FacebookIcon />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
        <div className="animate-hover-pause carousel flex overflow-hidden py-4">
          <div className="flex shrink-0 grow-0 basis-full animate-[scrolling_90s_linear_infinite] gap-4 pr-4 will-change-transform">
            {posts
              ? posts.map((p) => <ContentTile {...p} key={p.id} />)
              : Array(LIMIT)
                  .fill(0)
                  .map((_, idx) => <ContentTileSkeleton key={idx} />)}
          </div>
          <div
            className="flex shrink-0 grow-0 basis-full animate-[scrolling_90s_linear_infinite] gap-4 pr-4 will-change-transform"
            aria-hidden
          >
            {posts
              ? posts.map((p) => <ContentTile {...p} key={p.id} />)
              : Array(LIMIT)
                  .fill(0)
                  .map((_, idx) => <ContentTileSkeleton key={idx} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
