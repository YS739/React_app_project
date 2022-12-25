import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../redux/components/Detail/Comments";
import CommentUpload from "../../redux/components/Detail/CommentUpload";
import Post from "../../redux/components/Detail/Post";
import { __getComment } from "../../redux/modules/commentsSlice";
import { __getPosts } from "../../redux/modules/postsSlice";


const DetailPage = () => {
  const { error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getComment());
    dispatch(__getPosts());
  }, [dispatch]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Post />
      <CommentUpload />
      <Comments />
    </div>
  );
};
export default DetailPage;
