import React from "react";
import { Pet } from "@/types/pet";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cat, Dog, HelpCircle, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Tip } from "@/components/ui/tooltip";
import { sexDict } from "@/utils/dict";

interface PetItem {
  pet: Pet;
}

const PetItem = ({ pet }: PetItem) => {
  return (
    <Link href={`/pet/${pet.id}`} className="group">
      <article
        key={pet.id}
        className="relative rounded-lg flex flex-col items-center p-1 bg-primary text-background"
      >
        <PetProfileAvatar pet={pet} />

        <DescriptionIcon
          pet={pet}
          className="absolute top-0 right-0 z-10 bg-primary p-1 rounded-bl-lg rounded-tr-lg"
        />

        <div className="-mt-4 relative z-10 rounded-lg p-2 group-even:bg-red-500 bg-amber-500">
          {pet.specie.name == "Gato" ? <Cat className="size-8" /> : <Dog className="size-8" />}
        </div>

        <h2>{pet.name}</h2>
      </article>
    </Link>
  );
};

export default PetItem;

interface PetProfileAvatarProps extends Pick<PetAvatarProps, "avatarProps"> {
  pet: Pet;
}

export const PetProfileAvatar = ({ pet, ...props }: PetProfileAvatarProps) => {
  const petProfileImage = pet.images.find((img) => img.id === pet.mainImageId);
  return (
    <PetAvatar
      {...props}
      avatarProps={{
        ...props.avatarProps,
        className: cn(props.avatarProps?.className, "aspect-video"),
      }}
      src={petProfileImage?.src}
      alt={pet.name}
    />
  );
};

interface PetAvatarProps {
  alt: string;
  src?: string;
  avatarProps?: AvatarProps;
}

export const PetAvatar = ({ alt, src, avatarProps }: PetAvatarProps) => {
  return (
    <Avatar
      {...avatarProps}
      className={cn(
        "w-full h-auto rounded-[calc(var(--radius)_-_0.015rem)]",
        avatarProps?.className,
      )}
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
};

interface DescriptionIconProps {
  pet: Pet;
  className?: string;
}

const DescriptionIcon = ({ pet, className }: DescriptionIconProps) => {
  const tooltipContent = `${pet.specie.name} - ${pet.breed.name} - ${sexDict[pet.sex]}`;

  return (
    <Tip content={tooltipContent} className={cn(className, "flex")} asChild>
      <HelpCircle className="h-auto w-auto" />
    </Tip>
  );
};
