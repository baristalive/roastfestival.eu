"use client";
import CarouselIcon from "@/app/icons/carousel";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import VideoIcon from "@/app/icons/video";
import React, { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import Bar from "@/app/components/Bar";

const LIMIT = 5;

const INSTAGRAM_PARAMS = new URLSearchParams({
  access_token:
    "IGQWRNSjY3SmRfLUlhUWs0cENNbHk4bTRucnMyaEtoNVlHenFFNFVxajVfQUlNcXRNdEtRRWhhajN3OU1rZAUVPdUVfWFpIZA1lobzgtRmlvY2RvMjRkR05mQmgxcVdNcnByZADEwODUwNXl5dXpuem9yUk9kcUtiTFUZD",
  fields: "media_url,permalink,media_type,thumbnail_url,caption",
  limit: LIMIT.toString(),
});

const INSTAGRAM_URL = `https://graph.instagram.com/me/media?${INSTAGRAM_PARAMS}`;

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
          className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl object-cover"
          alt={post.caption}
        />
        <div className="absolute right-3 top-3 z-20 text-xl text-[var(--white)]">
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
  const ref = useRef(null);

  const { contextSafe } = useGSAP();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(INSTAGRAM_URL)
      .then((resp) => resp.json())
      .then((data) => setPosts(data?.data));
  }, []);

  return (
    <section className="social-section">
      <div className="mx-auto grid max-w-[1900px] items-end gap-12 p-8 lg:grid-cols-[1fr,3fr] 2xl:gap-32">
        <div className="flex flex-col md:p-12">
          <h2 className="pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.social.title}
          </h2>
          <div className="space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.social.text}
          </div>
          <div>
            <Bar mountRef={ref} contextSafe={contextSafe} />
          </div>
          <div className="my-12 flex gap-4 text-sm md:text-xl 2xl:text-2xl">
            <a
              href={lang.contacts.instagram}
              title="Instagram"
              rel="external"
              className="nav"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href={lang.contacts.facebook}
              title="Facebook"
              rel="external"
              className="nav"
            >
              <FacebookIcon />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
        <div className="animate-hover-pause carousel flex overflow-hidden py-4">
          <div className="flex shrink-0 grow-0 basis-full animate-[scrolling_90s_linear_infinite] gap-4 pr-4 will-change-transform">
            {posts
              ? posts.map((p: InstagramPost) => (
                  <ContentTile {...p} key={p.id} />
                ))
              : Array(LIMIT)
                  .fill(0)
                  .map((i, idx) => <ContentTileSkeleton key={idx} />)}
          </div>
          <div
            className="flex shrink-0 grow-0 basis-full animate-[scrolling_90s_linear_infinite] gap-4  pr-4 will-change-transform"
            aria-hidden
          >
            {posts
              ? posts.map((p: InstagramPost) => (
                  <ContentTile {...p} key={p.id} />
                ))
              : Array(LIMIT)
                  .fill(0)
                  .map((i, idx) => <ContentTileSkeleton key={idx} />)}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center">
        <p className="mb-4">Zjisti vice na</p>
        <div className="flex justify-center gap-4">
          <InstagramIcon />
          <FacebookIcon />
        </div>
      </div> */}
    </section>
  );
};

export default InstagramFeed;