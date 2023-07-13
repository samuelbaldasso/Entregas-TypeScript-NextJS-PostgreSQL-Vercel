import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import styles from "./date.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { format } from "date-fns";

export default function RegistersData() {
  const [form, setForm] = useState<any>([]);
  const router = useRouter();

  const handleAPI = async () => {
    const date = router.asPath.split("/")[2];
    const res = await axios.get("/api/service");
    const arr = JSON.parse(res.data);
    const filteredData = arr.filter((item: any) => {
      return format(new Date(item.date), "dd-MM-yyyy").toString() === date;
    });
    setForm(filteredData);
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
          <h3>{e?.message}</h3>
        </div>
      ))}
    </div>
  );
}
