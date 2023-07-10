import React, { useState } from "react";
import styles from "./form.module.css";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

interface Task {
  date: string;
  title: string;
  description: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task: Task = {
      date,
      title,
      description,
    };
    onSubmit(task);
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input}>
        <label className={styles.legend}>Tarefa</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={styles.legend}>Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label className={styles.legend}>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default TaskForm;
