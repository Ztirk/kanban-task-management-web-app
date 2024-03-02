import React from "react";
import Sidebar from "../Sidebar";
import Container from "./Container";

interface Props {
  children: React.ReactNode;
}

export default function Frame({ children }: Props) {
  return (
    <Container
      className={`grid grid-cols-[auto_1fr] grid-rows-1 
                  overflow-hidden`}
    >
      <Sidebar />
      {children}
    </Container>
  );
}
