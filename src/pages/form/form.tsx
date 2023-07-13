import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorText/error";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    message: "",
  });
  const [visible, setVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== null) {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
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
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      setFormData({ title: "", date: "", message: "" });
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      await axios.post("/api/service", formData);
      setFormData({ title: "", date: "", message: "" });
      router.push("/");
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
            placeholder="Digite uma tarefa qualquer"
            value={formData.title}
            onChange={handleChange}
          />
          <label className={styles.legend}>Data</label>
          <input
            type="date"
            name="date"
            placeholder="dd/mm/aaaa"
            min={0}
            value={formData.date}
            onChange={handleChange}
          />
          <label className={styles.legend}>Descrição</label>
          <textarea
            name="message"
            placeholder="Descreva melhor a sua tarefa"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Adicionar
        </button>
        {visible === true && (
          <ErrorPage phrase="Preencha todos os dados corretamente." />
        )}
      </form>
    </>
  );
}
