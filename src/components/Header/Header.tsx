import Link from "next/link";
import styles from "./header.module.css";

const handleExport = () => {
  const data = localStorage.getItem("tasks");
  if (data) {
    const jsonData = JSON.parse(data);
    const jsonDataString = JSON.stringify(jsonData, null, 2);
    const element = document.createElement("a");
    const file = new Blob([jsonDataString], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "tasks.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
};

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
        <Link className={styles.link} href="#" onClick={handleExport}>
          Download
        </Link>
      </div>
    </div>
  );
}
