import React from "react";
import { Pet } from "./types/pet";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dog, PawPrint } from "lucide-react";
interface PetItem {
  pet: Pet;
}

const PetItem = ({ pet }: PetItem) => {
  const petProfileImage = pet.images.find((img) => img.id === pet.mainImageId);
  return (
    <Link href={`/pet/${pet.id}`} className="group">
      <article
        key={pet.id}
        className="rounded-lg flex flex-col items-center p-1 bg-primary text-background"
      >
        <Avatar className="w-full h-full aspect-video rounded-[calc(var(--radius)_-_0.015rem)]">
          <AvatarImage
            src={petProfileImage?.src}
            alt={pet.name}
            className="object-cover"
          />
          <AvatarFallback
            delayMs={400}
            className="rounded-[calc(var(--radius)_-_0.015rem)] text-primary"
          >
            <PawPrint className="size-[25%]" />
          </AvatarFallback>
        </Avatar>

        <div className="-mt-4 relative z-10 rounded-lg p-2 bg-primary //group-even:bg-red-500 //bg-amber-500">
          {/* these commented classes are the actual figma design but I prefer the bg-primary */}
          <Dog className="size-8" />
        </div>

        <h2>{pet.name}</h2>
      </article>
    </Link>
  );
};

export default PetItem;
