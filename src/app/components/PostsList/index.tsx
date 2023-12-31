import React from "react";
import classes from "./index.module.css";
import PostItem from "../PostItem";
import { IPostsList } from "@/app/types";

const PostsList: React.FC<IPostsList> = ({ posts }) => {
  return (
    <ul className={classes.listWrapper}>
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </ul>
  );
};

export default PostsList;
