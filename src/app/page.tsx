"use client";

import Button from "@/pages/data/Button";
import IndexPage from ".";
import RegistersData from "@/pages/data/[date]";

export default function App() {
  return (
    <>
      <IndexPage></IndexPage>
      <Button></Button>
      <RegistersData></RegistersData>
    </>
  );
}
