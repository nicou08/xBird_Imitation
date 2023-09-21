"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useCallback } from "react";

import userCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";

import Button from "@/components/modals/Button";
import Avatar from "@/components/shared/RightSideBar/Avatar";

const Form = ({
  placeholder,
  isComment,
  postId,
}: {
  placeholder: string;
  isComment?: boolean;
  postId?: boolean;
}) => {
  const { data: currentUser } = userCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    console.log("First");
    try {
      setIsLoading(true);
      //const url = isComment ? `/api/comments?post` : `/api/posts`;

      console.log("Form onSubmit: ", body);
      await axios.post("/api/posts", { body });

      toast.success("Tweet created!");

      setBody("");

      // Once we create a new post, we want to refetch the posts,
      // including the new one we just created.
      mutatePosts();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar userId={currentUser?.id} />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder={placeholder}
            className="
            text-light-1
            disabled:opacity-80
            peer
            resize-none
            mt-3
            w-full
            bg-black
            ring-0
            outline-none
            text-[20px]
            placeholder-neutral-500 "
          />
          <hr
            className="
            opacity-0 
            peer-focus:opacity-100 
            h-[1px] 
            w-full 
            border-neutral-800 
            transition"
          />
          <div className="mt-4 flex flex-row justify-end">
            <Button
              disabled={isLoading || !body}
              onClick={onSubmit}
              label="Tweet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
