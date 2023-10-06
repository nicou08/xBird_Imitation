"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUsers = () => {
  const baseURL = process.env.NEXT_PUBLIC_URL;

  console.log("Here useUsers baseURL:: ", baseURL);

  const { data, error, isLoading, mutate } = useSWR(`/api/users`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
