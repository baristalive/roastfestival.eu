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
export type InstagramPost = {
  media_url: string;
  media_type: InstagramMediaType;
  thumbnail_url: string;
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
      .slice(0, LIMIT)
      .filter((d): d is InstagramPost => d !== undefined);

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
