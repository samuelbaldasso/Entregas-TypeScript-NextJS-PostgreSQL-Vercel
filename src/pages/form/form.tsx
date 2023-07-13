import React, { useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import styles from "./form.module.css";
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
      alert("Preencha todos os dados corretamente.");
      setFormData({ title: "", date: "", message: "" });
    } else {
      await axios.post("/api/service", formData);
      alert("Seus dados foram salvos.");
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
            value={formData.title}
            onChange={handleChange}
          />
          <label className={styles.legend}>Data</label>
          <input
            type="date"
            name="date"
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
