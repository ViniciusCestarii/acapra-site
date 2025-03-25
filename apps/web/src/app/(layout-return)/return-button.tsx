"use client";

import { Button } from "@/components/ui/button";
import { Tip } from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ReturnButton = () => {
  const router = useRouter();
  return (
    <Tip content="Retornar à pagina anterior" asChild>
      <Button
        size="icon"
        onClick={() => router.back()}
        className="cursor-pointer"
      >
        <ArrowLeft />
      </Button>
    </Tip>
  );
};

export default ReturnButton;
