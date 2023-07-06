import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link className={styles.title} href="/">
        <h1>Entregas RD</h1>
      </Link>
      <Link href="/data/registers" className={styles.link}>
        Registros
      </Link>
    </div>
  );
}
