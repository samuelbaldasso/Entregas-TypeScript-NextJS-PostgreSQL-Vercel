import Header from "@/components/Header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./id.module.css";
import Router from "next/router";

export default function RegistersData() {
  const [form, setForm] = useState([]);

  const handleAPI = async () => {
    const id = Router.asPath.split("/")[2];
    console.log(id)
    const res = await axios.get(`http://localhost:3001/formData?id=${id}`);
    // const filteredData = res.data.filter((item: any) => item.id === id);
    setForm(res.data);
    console.log(form);
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div>
      <Header></Header>

      {form.map((e: any) => (
        <div key={e?.id} className={styles.block}>
          <h3>{e?.title}</h3>
          <h3>{e?.date}</h3>
          <h3>{e?.message}</h3>
        </div>
      ))}
    </div>
  );
}
