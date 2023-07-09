import Header from "@/components/Header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./date.module.css";
import Router from "next/router";

export default function RegistersData() {
  const [form, setForm] = useState([]);

  const handleAPI = async () => {
    const date = Router.asPath.split("/")[2];
    const res = await axios.get(`/api/api`);
    const filteredData = res.data.filter((item: any) => item.date === date);
    setForm(filteredData);
    console.log(form);
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
          <h3>{e?.date}</h3>
          <h3>{e?.message}</h3>
        </div>
      ))}
    </div>
  );
}
