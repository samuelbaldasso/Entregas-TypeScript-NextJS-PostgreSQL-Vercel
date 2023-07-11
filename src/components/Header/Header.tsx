import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link className={styles.title} href="/">
          <h1>Entregas RD</h1>
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/data/registers" className={styles.link}>
          Registros
        </Link>
        {/* <Link className={styles.link} href="#" onClick={handleExport}>
          Download
        </Link> */}
      </div>
    </div>
  );
}
