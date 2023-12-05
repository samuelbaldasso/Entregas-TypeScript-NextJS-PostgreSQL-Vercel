import React, { useEffect, useState } from "react";
import styles from "./button.module.css";
import Link from "next/link";
import Header from "../../components/Header/Header";
import axios from "axios";
import ErrorText from "@/components/ErrorText/error";

export default function Button() {
  const [form, setForm] = useState<any>([]);
  const [dates, setDates] = useState<any>([]);
  const [visible, setVisible] = useState(false);

  const handleData = async () => {
    let res = await axios.get("/api/service");
    console.log(res.data.rows);
    if (res.data.rows.length === 0) {
      setVisible(true);
    } else {
      setForm(res.data.rows);
      setVisible(false);
    }
  };

  function formatDate(dateString: string): string {
    const originalDate = dateString.replace(/\//g, "-");
    console.log(originalDate);
    return originalDate;
  }  

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    const sortedForm = [...form].sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      return dateA - dateB;
    });
    const uniqueDates = Array.from(
      new Set(sortedForm.map((item: any) => item.date))
    );
    setDates(uniqueDates);
  }, [form]);

  return visible === true ? (
    <>
      <Header />
      <ErrorText phrase={"Não existem tarefas registradas."}/>
    </>
  ) : (
    <div>
      <Header />
      {dates.map((date: any) => (
        <button className={styles.button} key={date}>
          <Link className={styles.link} href={`/data/${formatDate(date)}`}>
            <h3>{date}</h3>
          </Link>
        </button>
      ))}
    </div>
  );
}
