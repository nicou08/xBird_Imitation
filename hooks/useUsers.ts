"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUsers = () => {
  const baseURL = process.env.URL;

  const { data, error, isLoading, mutate } = useSWR(
    `${baseURL}/api/users`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
