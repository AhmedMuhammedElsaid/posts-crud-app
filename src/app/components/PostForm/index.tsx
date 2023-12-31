"use client";
import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { IPropsEdit } from "@/app/types";

const PostForm: React.FC<IPropsEdit> = ({ id }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    // Fetch the post and set the title and body in case of edit mode
    (async function fetchPost() {
      const postData = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (postData?.status === 200) {
        setTitle(postData.data.title);
        setBody(postData.data.body);
      }
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate inputs before submitting
    if (handleValidateInputs()) return;

    setIsLoading(true);

    const postData = { title, body, userId: 1 };

    const response = await axios(
      `https://jsonplaceholder.typicode.com/posts${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        data: id ? { ...postData, id } : postData,
      }
    );

    if ([200, 201].includes(response.status)) {
      toast.success(
        `Post ${id ? `Number ${id} Edited` : "Created"} Successfully`
      );
      setIsLoading(false);
      if (id) return;
      setBody("");
      setTitle("");
    } else {
      toast.error("Something went wrong. please try again");
      setIsLoading(false);
    }
  };
  const handleValidateInputs = () => {
    if (!title.length) {
      toast.error("Please enter the post title");
      return true;
    }
    if (!body.length) {
      toast.error("Please enter the post body");
      return true;
    }
    return false;
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.label} htmlFor="body">
        Title
      </label>
      <input
        className={classes.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="write post title..."
        data-testid="title-input"
      />
      <label className={classes.label} htmlFor="body">
        Body
      </label>
      <textarea
        className={classes.textarea}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="write post body..."
        rows={5}
        data-testid="body-input"
      />
      <button
        className={classes.button}
        type="submit"
        disabled={!body.length || !title.length}
        data-testid="submit-button"
      >
        {isLoading ? "Submitting..." : id ? "Edit" : "Create"}
      </button>
    </form>
  );
};

export default PostForm;
