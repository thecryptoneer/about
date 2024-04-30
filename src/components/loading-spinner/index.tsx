import React from "react";
import styles from "@/components/loading-spinner/loading-spinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles["spinner"]}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`${i}-spinner-blade`}
          className={styles["spinner-blade"]}
        ></div>
      ))}
    </div>
  );
}
