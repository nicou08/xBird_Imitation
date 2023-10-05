"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePosts = (userId?: string) => {
  const baseURL = process.env.URL;

  const url = userId
    ? `${baseURL}/api/posts?userId=${userId}`
    : `${baseURL}/api/posts`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
