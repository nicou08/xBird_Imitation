"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUsers = () => {
  const baseURL = process.env.URL;

  console.log("Here baseURL:: ", baseURL);

  const { data, error, isLoading, mutate } = useSWR(`/api/users`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
