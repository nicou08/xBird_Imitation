// "use client";

import Header from "@/components/shared/Main/Header";
import Form from "@/components/forms/Form";
import PostFeed from "@/components/posts/PostFeed";

//import { useSession } from "next-auth/react";
export const dynamic = "force-dynamic";

export default function Home() {
  // const { data: session, status } = useSession();

  // console.log("Home useStatuss: ", status);
  // console.log("Home useSession: ", session);

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's Happening?" />
      <PostFeed />
    </>
  );
}
