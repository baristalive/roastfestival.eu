"use client";
import { useEffect, useState } from "react";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";
import { app } from "@/app/utils/firebase";

const LIMIT = 7;

const INSTAGRAM_PARAMS = new URLSearchParams({
  fields: "media_url,permalink,media_type,thumbnail_url,caption",
  limit: LIMIT.toString(),
});

const INSTAGRAM_URLS = [
  "https://graph.instagram.com/me/stories",
  "https://graph.instagram.com/me/media",
];

export type InstagramMediaType = "CAROUSEL_ALBUM" | "IMAGE" | "VIDEO";
type InstagramApiPost = {
  media_url?: string;
  media_type?: InstagramMediaType;
  thumbnail_url?: string;
  permalink?: string;
  caption?: string;
  id?: string;
};

export type InstagramPost = {
  image_url: string;
  media_type: InstagramMediaType;
  permalink: string;
  caption: string;
  id: string;
};

// Module-level cache so multiple components share a single fetch
let cachedPosts: InstagramPost[] | null = null;
let fetchPromise: Promise<InstagramPost[]> | null = null;

function fetchInstagramPosts(): Promise<InstagramPost[]> {
  if (cachedPosts) return Promise.resolve(cachedPosts);
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    const remoteConfig = getRemoteConfig(app);
    await fetchAndActivate(remoteConfig);
    const apiKey = getValue(remoteConfig, "INSTAGRAM_API_KEY").asString();

    if (!apiKey) return [];

    INSTAGRAM_PARAMS.set("access_token", apiKey);
    const rawResponses = await Promise.all(
      INSTAGRAM_URLS.map((url) => fetch(`${url}?${INSTAGRAM_PARAMS}`)),
    );
    const data = await Promise.all(rawResponses.map((resp) => resp.json()));
    const posts = data
      .map((d) => d?.data)
      .flat()
      .filter(
        (d): d is Required<InstagramApiPost> =>
          d != null &&
          typeof d.id === "string" &&
          typeof d.permalink === "string" &&
          typeof d.media_url === "string" &&
          d.media_url !== "" &&
          (d.media_type !== "VIDEO" ||
            (typeof d.thumbnail_url === "string" && d.thumbnail_url !== "")),
      )
      .slice(0, LIMIT)
      .map(
        (d): InstagramPost => ({
          caption: d.caption ?? "",
          id: d.id,
          image_url: d.media_type === "VIDEO" ? d.thumbnail_url : d.media_url,
          media_type: d.media_type,
          permalink: d.permalink,
        }),
      );

    cachedPosts = posts;
    return posts;
  })();

  return fetchPromise;
}

export const INSTAGRAM_LIMIT = LIMIT;

export function useInstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>(cachedPosts ?? []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cachedPosts) return;

    fetchInstagramPosts().then(setPosts);
  }, []);

  return posts;
}
