import React, { useEffect, useState } from "react";
import TaskForm from "@/components/Form/form";
import Header from "@/components/Header/Header";
import { readJson, writeDataToJson } from "./service";

export default function IndexPage() {
  const [tasks, setTasks] = useState<any>([]);

  const handleSubmit = (task: any) => {
    setTasks((prev: any) => [...prev, task]);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      writeDataToJson(storedTasks);
      readJson();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <Header></Header>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
