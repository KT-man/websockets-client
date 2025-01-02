"use client";

import styles from "./page.module.css";
import ApiComponent from "./components/ApiComponent";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>This is the main page</div>
      <ApiComponent />
    </div>
  );
}
