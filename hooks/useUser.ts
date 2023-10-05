"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUser = (userId: string) => {
  const baseURL = process.env.URL;

  console.log("Here useUser baseURL:: ", baseURL);

  const { data, error, isLoading, mutate } = useSWR(
    userId ? `${baseURL}/api/users/${userId}` : null,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
