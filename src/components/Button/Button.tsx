"use client";

import React, { useEffect, useState } from "react";
import styles from "@/components/Button/button.module.css";
import Link from "next/link";

async function sortDate(data: any) {
  let mappedArr = data.map((e: any) => e.date);
  mappedArr.sort((n1: any, n2: any) => {
    if (n1 > n2) {
      return 1;
    }

    if (n1 < n2) {
      return -1;
    }

    return 0;
  });

  const filteredData = mappedArr.filter((value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
  });

  return filteredData;
}

export default function Button() {
  const [form, setForm] = useState<any>([]);

  const handleData = async () => {
    const dados = localStorage.getItem("tasks");
    if (dados !== null) {
      const array = await sortDate(JSON.parse(dados));
      setForm(array);
      console.log(form);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
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
