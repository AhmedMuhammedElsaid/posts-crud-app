"use client";
import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import { IPost, IProps } from "@/app/types";
import PostItem from "@/app/components/PostItem";

const PostDetail: React.FC<IProps> = (props) => {
  const { id } = props?.params;
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  if (!post) return <div>Loading Post Details...</div>;

  return (
    <>
      <h1>Post Number {id} Details</h1>
      <div className={classes.postContainer}>
        <PostItem key={post.id} {...post} hideView />
      </div>
    </>
  );
};

export default PostDetail;
