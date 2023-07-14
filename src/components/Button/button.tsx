"use client";

import React, { useEffect, useState } from "react";
import styles from "./button.module.css";
import Link from "next/link";
import Header from "../Header/Header";
import axios from "axios";
import { format } from "date-fns";

export default function Button() {
  const [form, setForm] = useState<any>([]);
  const [visible, setVisible] = useState(false);

  const handleData = async () => {
    let res = await axios.get("/api/service");
    if (!res.data) {
      setVisible(true);
    } else {
      let arr = JSON.parse(res.data);
      let mappedArr = arr.map((e: any) => {
        let finalDate = new Date(e.date);
        let newDay = finalDate.getDate() + 1;
        return `${newDay}-0${finalDate.getMonth()}-${finalDate.getFullYear()}`;
      });
      mappedArr.sort((n1: any, n2: any) => {
        if (n1 > n2) {
          return 1;
        }

        if (n1 < n2) {
          return -1;
        }

        return 0;
      });

      const filteredData: any[] = mappedArr.filter(
        (value: any, index: any, self: any) => {
          return self.indexOf(value) === index;
        }
      );
      setForm(filteredData);
      setVisible(false);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return visible === true ? (
    <>
      <Header></Header>
      <div style={{ color: "red", display: "flex", justifyContent: "center" }}>
        <h3>Não existem tarefas.</h3>
      </div>
    </>
  ) : (
    <div>
      <Header></Header>
      {form.map((e: any) => (
        <button className={styles.button}>
          <Link key={e} href={`/data/${e}`}>
            <h3>{e}</h3>
          </Link>
        </button>
      ))}
    </div>
  );
}
