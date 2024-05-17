"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.date === null ||
      formData.message === ""
    ) {
      alert("Preencha todos os dados corretamente.");
      setFormData({ title: "", date: new Date(), message: "" });
    } else {
      const formattedDate = formData.date.toISOString().split("T")[0];
      await axios.post("/api/service", {
        ...formData,
        date: formattedDate,
      });
      alert("Seus dados foram salvos.");
      setFormData({ title: "", date: new Date(), message: "" });
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
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
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