import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import styles from "./date.module.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegistersData() {
  const [form, setForm] = useState<any>([]);
  const router = useRouter();

  const handleAPI = async () => {
    try {
      const date = router.query.date as string;
      const res = await axios.get("/api/service");
      const arr = JSON.parse(res.data);
      const filteredData = arr.filter((item: any) => item.date === date);
      setForm(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleAPI();
  }, [router.query.date]);

  return (
    <div>
      <Header></Header>
      {form.map((e: any) => (
        <div key={e?.date} className={styles.block}>
          <h3>{e?.title}</h3>
          <h3>{e?.message}</h3>
        </div>
      ))}
    </div>
  );
}
