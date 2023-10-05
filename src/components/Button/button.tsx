"use client";

import React, { useEffect, useState } from "react";
import styles from "./button.module.css";
import Link from "next/link";
import Header from "../Header/Header";
import axios from "axios";

export default function Button() {
  const [form, setForm] = useState<any>([]);
  const [dates, setDates] = useState<any>([]);
  const [visible, setVisible] = useState(false);

  const handleData = async () => {
    let res = await axios.get("/api/service");
    if (res.data === "[]") {
      setVisible(true);
    } else {
      let arr = JSON.parse(res.data);
      setForm(arr);
      setVisible(false);
    }
  };

  function formatDate(dateString: string): string {
    const originalDate = new Date(dateString);
    originalDate.setDate(originalDate.getDate() + 1); // Increase the day value by 1
    const formattedDate = new Intl.DateTimeFormat().format(originalDate);
    return formattedDate;
  }

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    // Sort the 'form' array based on formatted dates
    const sortedForm = [...form].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    const uniqueDates = Array.from(
      new Set(sortedForm.map((item: any) => item.date))
    );
    setDates(uniqueDates);
  }, [form]);

  return visible === true ? (
    <>
      <Header />
      <div
        style={{
          color: "red",
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <h3>Não existem tarefas.</h3>
      </div>
    </>
  ) : (
    <div>
      <Header />
      {dates.map((date: any) => (
        <button className={styles.button}>
          <Link href={`/data/${date}`} key={date}>
            <h3>{formatDate(date)}</h3>
          </Link>
        </button>
      ))}
    </div>
  );
}
