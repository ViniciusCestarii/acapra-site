"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrint, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface PetAvatarProps {
  alt: string;
  src?: string;
  avatarProps?: AvatarProps;
  expandable?: boolean;
  petName?: string;
}

export const PetAvatar = ({ alt, src, avatarProps, expandable = false }: PetAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const avatarContent = (
    <Avatar
      {...avatarProps}
      className={cn(
        "w-full h-auto rounded-[calc(var(--radius)_-_0.015rem)]",
        expandable && "cursor-pointer hover:opacity-90 transition-opacity",
        avatarProps?.className,
      )}
      onClick={expandable ? () => setIsOpen(true) : undefined}
    >
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback
        delayMs={src ? 400 : undefined}
        className="rounded-[calc(var(--radius)_-_0.015rem)] text-primary"
      >
        <PawPrint className="size-[25%]" />
      </AvatarFallback>
    </Avatar>
  );

  if (!expandable) {
    return avatarContent;
  }

  return (
    <>
      {avatarContent}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl w-[90vw] p-4 sm:max-w-6xl">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
