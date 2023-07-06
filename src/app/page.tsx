"use client";

import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Link from "next/link";

function Home() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Salve os dados no arquivo JSON usando a API
    try {
      await axios.post("/api", formData);
      console.log("Dados salvos com sucesso.");
    } catch (error) {
      console.error("Ocorreu um erro ao salvar os dados:", error);
    }
  };

  return (
    <>
      <Header></Header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Data</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label>Mensagem</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          <Link href="/data/registers">Enviar</Link>
        </button>
      </form>
    </>
  );
}

export default Home;
