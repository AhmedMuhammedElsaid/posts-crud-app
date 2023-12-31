import Link from "next/link";
import classes from "./item.module.css";
import { CiEdit } from "react-icons/ci";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IPost } from "@/app/types";
import axios from "axios";
import { toast } from "react-toastify";

interface IProps extends IPost {
  hideView?: boolean;
}

const PostItem = ({ title, body, id, hideView }: IProps) => {
  const handleDeletePost = async () => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (response.status === 200)
      toast.success(`Post Number ${id} Deleted Successfully`);
    else toast.error("Something went wrong");
  };

  return (
    <li key={id} className={classes.listItem} data-testid={`test-${id}`}>
      <h2 data-testid="post-title" className={classes.title}>
        {title}
      </h2>
      <p data-testid="post-body" className={classes.body}>
        {body}
      </p>
      <div className={classes.icons} data-testid="icons-wrapper">
        {!hideView && (
          <Link href={`/post/${id}`}>
            <FaEye size="1.5rem" />
          </Link>
        )}
        <Link href={`/post/${id}/edit`}>
          <CiEdit size="1.5rem" />
        </Link>
        <button
          data-testid="delete-button"
          className={classes.delete}
          onClick={handleDeletePost}
        >
          <FaRegTrashAlt size="1.2rem" />
        </button>
      </div>
    </li>
  );
};

export default PostItem;
