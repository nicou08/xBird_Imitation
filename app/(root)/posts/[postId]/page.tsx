"use client";

import { ClipLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import usePost from "@/hooks/usePost";

import Header from "@/components/shared/Main/Header";
import Form from "@/components/forms/Form";
import PostItem from "@/components/posts/PostItem";

const PostView = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;
  //console.log("postId:: ", postId);
  const { data: fetchedPost, isLoading } = usePost(postId as string);
  //console.log("fetchedPost:: ", fetchedPost);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="#ffffff" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Reply" />
    </>
  );
};

export default PostView;
