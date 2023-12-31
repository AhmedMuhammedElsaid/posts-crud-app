"use client";
import PostsList from "@/app/components/PostsList";
import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import axios from "axios";
import { IPost } from "./types";

const Page: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response?.data);
    })();
  }, []);
  if (!posts.length) return <div>Loading...</div>;
  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Posts</h1>
      {posts && <PostsList posts={posts} />}
    </div>
  );
};

export default Page;
