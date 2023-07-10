import React, { useEffect, useState } from "react";
import styles from "@/components/Button/button.module.css";
import Link from "next/link";

export default function Button() {
  const [form, setForm] = useState<any>([]);

  const handleData = () => {
    const dados = localStorage.getItem("tasks");
    if (dados !== null) {
      const array = JSON.parse(dados);
      setForm(array);
      console.log(form);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      {form.map((e: any) => (
        <Link key={e?.title} href={`/data/${e?.date}`}>
          <button className={styles.button}>
            <h3>{e?.title}</h3>
            <h3>{e?.date}</h3>
          </button>
        </Link>
      ))}
    </div>
  );
}
