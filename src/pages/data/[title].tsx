import Header from "@/components/Header/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./title.module.css";

export default function RegistersData() {
  const [form, setForm] = useState([]);
  const router = useRouter();

  const handleAPI = async () => {
    const title = router.asPath.split("/")[2];
    const res = await axios.get(`/api`);
    const filteredData = res.data.filter((item: any) => item.title === title);
    setForm(filteredData);
    console.log(form);
  };

  useEffect(() => {
    if (form) {
      handleAPI();
    }
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
