"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "date" && value.length > 10) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.slice(0, 10),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.date === "" ||
      formData.message === ""
    ) {
      alert("Preencha todos os dados corretamente.");
      setFormData({ title: "", date: "", message: "" });
    } else {
      await axios.post("/api/service", formData);
      alert("Seus dados foram salvos.");
      setFormData({ title: "", date: "", message: "" });
      router.push("/registers/button");
    }
  };

  return (
    <>
      <Header></Header>
      <form className={styles.form}>
        <div className={styles.input}>
          <label className={styles.legend}>Tarefa</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label className={styles.legend}>Data</label>
          <input
            type="date"
            name="date"
            placeholder="dd/mm/aaaa"
            value={formData.date}
            onChange={handleChange}
          />
          <label className={styles.legend}>Descrição</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Adicionar
        </button>
      </form>
    </>
  );
}
