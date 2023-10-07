"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePosts = (userId?: string) => {
  const baseURL = process.env.URL;
  console.log("Here usePosts userId:: ", userId);

  const url = userId ? `/api/posts?userId=${userId}` : `/api/posts`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
