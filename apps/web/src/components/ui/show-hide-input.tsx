"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface ShowHideInputProps extends React.ComponentProps<"input"> {
  iconProps?: React.ComponentProps<"button">;
}

export default function ShowHideInput({
  iconProps,
  ...props
}: ShowHideInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Input {...props} type={isVisible ? "text" : "password"} />
      <button
        {...iconProps}
        className={cn(
          "text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          iconProps?.className,
        )}
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <EyeOffIcon aria-hidden="true" />
        ) : (
          <EyeIcon aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
