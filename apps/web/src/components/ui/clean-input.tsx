"use client";

import { CircleXIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ChangeEvent, useRef } from "react";
import { cn } from "@/lib/utils";

interface ClearInputProps extends React.ComponentProps<"input"> {}

export default function ClearInput({ className, ...props }: ClearInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    if (props.onChange === undefined) return;

    props.onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <Input {...props} ref={inputRef} className={cn("pe-9", className)} />
      {props.value && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
