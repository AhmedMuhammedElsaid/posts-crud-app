import Link from "next/link";
import classes from "./styles.module.css";

const Navbar = () => {
  return (
    <nav className={classes.Nav}>
      <Link href="/" passHref>
        <p className={classes.NavLink}>Posts</p>
      </Link>
      <Link href="/post/create" passHref>
        <p className={classes.NavLink}>Create Post</p>
      </Link>
    </nav>
  );
};

export default Navbar;
