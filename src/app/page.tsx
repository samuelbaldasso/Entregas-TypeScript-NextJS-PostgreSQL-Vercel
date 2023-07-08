"use client";

import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";

function Home() {
  const [formData, setFormData] = useState({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // let button = document.querySelector("button");
    if (e.target.value !== "") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      console.log(formData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/api", formData);
      alert("Seus dados foram salvos.");
    } catch (error) {
      alert("Ocorreu um erro ao salvar os dados. Por favor, tente novamente.");
    }
    setFormData({ title: "", date: "", message: "" });
  };

  return (
    <>
      <Header></Header>
      <form className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            required={true}
            minLength={5}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            name="date"
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            name="message"
            required={true}
            minLength={5}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </form>
    </>
  );
}

export default Home;
