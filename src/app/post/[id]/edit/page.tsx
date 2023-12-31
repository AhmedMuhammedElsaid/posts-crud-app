"use client";
import PostForm from "@/app/components/PostForm";
import { IProps } from "@/app/types";

const UpdatePostPage = (props: IProps) => {
  const { id } = props?.params;
  return (
    <div>
      <h1>Update Post Number {id}</h1>
      <PostForm id={id} />
    </div>
  );
};

export default UpdatePostPage;
