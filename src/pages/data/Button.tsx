import React, { useEffect, useState } from "react";
import styles from "./button.module.css";
import Link from "next/link";
import Header from "@/components/Header/Header";
import { readJson, sortDate } from "@/app/service";

export default function Button() {
  const [form, setForm] = useState<any>([]);

  const handleData = async () => {
    const dados = await readJson();
    console.log(dados);
    if (dados) {
      const array = await sortDate(dados);
      setForm(array);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <Header></Header>
      {form.map((e: any) => (
        <Link key={e} href={`/data/${e}`}>
          <button className={styles.button}>
            <h3>{e}</h3>
          </button>
        </Link>
      ))}
    </div>
  );
}
