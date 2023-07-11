import Header from "@/components/Header/Header";
import { useState, useEffect } from "react";
import styles from "./id.module.css";
import Router from "next/router";

export default function RegistersData() {
  const [form, setForm] = useState<any[]>([]);

  const handleAPI = async () => {
    const id = Router.asPath.split("/")[2];
    console.log(id);
    const dados = localStorage.getItem("tasks");
    if (dados) {
      let arr = JSON.parse(dados);
      const filteredData = arr.filter((item: any) => item.date === id);
      setForm(filteredData);
      console.log(form);
    }
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div>
      <Header></Header>
      {form.map((e: any) => (
        <div key={e?.title} className={styles.block}>
          <h3>{e?.title}</h3>
          <h3>{e?.description}</h3>
        </div>
      ))}
    </div>
  );
}
