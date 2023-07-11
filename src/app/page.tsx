"use client";

import React, { useEffect, useState } from "react";
import TaskForm from "../components/Form/form";
import Header from "@/components/Header/Header";
import { writeDataToJson } from "./service";

const IndexPage: React.FC = () => {
  const [tasks, setTasks] = useState<any>([]);

  const handleSubmit = (task: any) => {
    setTasks((prevTasks: any[]) => [...prevTasks, task]);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      writeDataToJson(storedTasks);
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
};

export default IndexPage;
