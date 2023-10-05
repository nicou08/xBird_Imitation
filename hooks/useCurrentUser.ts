"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

// SWR is going to fetch /api/current using the axios fetcher and store it in its global stored
const userCurrentUser = () => {
  const baseURL = process.env.URL;

  const { data, error, isLoading, mutate } = useSWR(
    `${baseURL}/api/current`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default userCurrentUser;
