"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUser = (userId: string) => {
  const baseURL = process.env.NEXT_PUBLIC_URL;

  console.log("Here useUser baseURL:: ", baseURL);
  console.log("Here process.env.URL", process.env.NEXT_PUBLIC_URL);

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
