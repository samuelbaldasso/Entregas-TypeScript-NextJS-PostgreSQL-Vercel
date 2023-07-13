import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/">
          <h1 className={styles.title}>Entregas RD</h1>
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/form/form">
          <h3 className={styles.link}>Formulário</h3>
        </Link>
      </div>
    </div>
  );
}
