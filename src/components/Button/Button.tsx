import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/components/Button/button.module.css";
import Link from "next/link";

export default function Button() {
  const [formData, setFormData] = useState([]);

  const handleAPI = async () => {
    const res = await axios.get("http://localhost:3001/formData");
    setFormData(res.data);
    console.log(formData)
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div>
      {formData.map((e: any) => (
        <Link key={e?.id} href={`/data/${e?.id}`}>
          <button className={styles.button}>
            <h3>{e?.title}</h3>
            <h3>{e?.date}</h3>
          </button>
        </Link>
      ))}
    </div>
  );
}
