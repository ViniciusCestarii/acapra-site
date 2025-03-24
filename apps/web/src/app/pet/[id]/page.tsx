import { getPetPetsById } from "@/app/client";
import { PetAvatar, PetProfileAvatar } from "@/app/pet-item";
import { Pet } from "@/app/types/pet";
import { notFound } from "next/navigation";
import React from "react";
import PetSexIcon from "./pet-sex-icon";

interface PetPageProps {
  params: Promise<{ id: string }>;
}

const PetPage = async ({ params }: PetPageProps) => {
  const { id } = await params;

  const result = await getPetPetsById({
    path: {
      id,
    },
  });

  if (result.error) {
    notFound();
  }

  const pet = result.data!;

  const petImages = makePetImages(pet);

  return (
    <>
      <p className="text-center py-4">Seu novo amigo</p>
      <div className="rounded-lg bg-white mx-10 space-y-6">
        <PetProfileAvatar
          pet={pet}
          avatarProps={{
            className: "rounded-b-none h-auto",
          }}
        />
        <div className="px-4 space-y-6">
          {petImages.length && (
            <div className="grid grid-cols-4 gap-4">
              {petImages.map((img) => {
                if (img.id.startsWith("padding-"))
                  return (
                    <div
                      key={img.id}
                      className="h-full rounded-md bg-gray-200"
                    />
                  );
                return (
                  <PetAvatar
                    key={img.id}
                    src={img.src}
                    alt={pet.name}
                    avatarProps={{ className: "aspect-square" }}
                  />
                );
              })}
            </div>
          )}
          <div className="flex flex-col space-y-4">
            <h1 className="font-bold text-5xl leading-9 flex items-end">
              {pet.name}
              <PetSexIcon
                sex={pet.sex}
                iconProps={{
                  className: "size-5 ml-1",
                }}
              />
            </h1>
            <p className="break-words">{pet.observations}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const makePetImages = (pet: Pet) => {
  const images: Pet["images"] = pet.images.sort((a) =>
    a.id === pet.mainImageId ? -1 : 1,
  );
  const remainder = images.length % 4;

  if (remainder === 0) return images;

  const padding: Pet["images"] = Array.from(
    { length: 4 - remainder },
    (_, i) => ({
      id: `padding-${i}`,
      src: "",
    }),
  );

  return [...images, ...padding];
};

export default PetPage;
