import React from "react";
import * as styles from "./Loader.module.css";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <div data-testid='loader' className={styles.loader__container}>
      <div className={styles.loader__line}></div>
    </div>
  ) : (
    <></>
  );
};

export default Loader;
