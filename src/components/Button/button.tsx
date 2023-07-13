"use client";

import React, { useEffect, useState } from "react";
import styles from "./button.module.css";
import Link from "next/link";
import Header from "../Header/Header";
import axios from "axios";
import { format } from "date-fns";

export default function Button() {
  const [form, setForm] = useState<any>([]);

  const handleData = async () => {
    const res = await axios.get("/api/service");
    const arr = JSON.parse(res.data);
    console.log(arr);
    let mappedArr = arr.map((e: any) =>
      format(new Date(e.date), "dd-MM-yyyy").toString()
    );
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
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <Header></Header>
      {form.map((e: any) => (
        <Link key={e} href={`/data/${e}`}>
          <button className={styles.button}>
            <h3>{e}</h3>
          </button>
        </Link>
      ))}
    </div>
  );
}
