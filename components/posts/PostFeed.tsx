"use client";

import usePosts from "@/hooks/usePosts";

import PostItem from "@/components/posts/PostItem";

const PostFeed = ({ userId }: { userId?: string }) => {
  const { data: posts = [] } = usePosts(userId);
  return (
    <>
      <div className="text-light-1">what is good</div>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
