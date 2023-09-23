import CommentItem from "./CommentItem";

const CommentFeed = ({
  comments = [],
}: {
  comments?: Record<string, any>[];
}) => {
  // Instead of writing comments?.map, you can write comments = [] in props
  // and then remove the ? from comments?.map
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
