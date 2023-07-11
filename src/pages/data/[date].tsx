import Header from "@/components/Header/Header";
import { useState, useEffect } from "react";
import styles from "./id.module.css";
import { useRouter } from "next/router";
import { readJson, returnDataByDate } from "@/app/service";

export default function RegistersData() {
  const [form, setForm] = useState<any[]>([]);

  const handleAPI = async () => {
    const router = useRouter();
    const id = router.asPath.split("/")[2];
    const dados = await readJson();
    if (dados) {
      const filteredData = await returnDataByDate(dados, id);
      setForm(filteredData);
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
