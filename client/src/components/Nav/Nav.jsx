import React from "react";
import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <SearchBar />
      <ul className={styles["navbar-nav"]}>
        <li className={styles["nav-item"]}>
          <a href="/home" className={styles["nav-link"]}>
            Home
          </a>
        </li>
        <li className={styles["nav-item"]}>
          <a href="/home/form" className={styles["nav-link"]}>
            Create Dog
          </a>
        </li>
        <li className={styles["nav-item"]}>
          <a href="/about" className={styles["nav-link"]}>
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
