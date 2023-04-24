import React from "react";
import cheems from "../../Images/cheems.png";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles["about-container"]}>
      <h2 className={styles["about-heading"]}>About Dog SPA</h2>
      <p className={styles["about-text"]}>
        Dog SPA was made for soyHenry bootcamp by @Jestruvec on April 2023 using
        technologies like:
      </p>
      <ul className={styles["about-text"]}>
        <li>React</li>
        <li>Redux</li>
        <li>Express</li>
        <li>Node JS</li>
        <li>Sequelize</li>
        <li>PostgreSQL</li>
      </ul>
      <p className={styles["about-text"]}>Most libraries were not allowed</p>
      <p className={styles["about-text"]}>
        This is an individual project carried out by a fullstack student, it is
        possible that some things do not work perfectly or you may find some
        bugs.
      </p>
      <img className={styles["about-image"]} src={cheems} alt="cheems"></img>
    </div>
  );
};

export default About;
