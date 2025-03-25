import { getPetPetsById } from "@/client";
import { PetAvatar, PetProfileAvatar } from "@/app/pet-item";
import { Pet } from "@/types/pet";
import { notFound } from "next/navigation";
import React from "react";
import PetSexIcon from "./pet-sex-icon";
import { Metadata } from "next";

interface PetPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PetPageProps): Promise<Metadata> {
  const { id } = await params;

  const result = await getPetPetsById({
    path: {
      id,
    },
  });

  if (result.error) {
    return notFound();
  }

  const pet = result.data!;

  const images: Pet["images"] = pet.images.sort((a) =>
    a.id === pet.mainImageId ? -1 : 1,
  );

  return {
    title: `${pet.name} - Acapra Adoção`,
    openGraph: {
      title: pet.name,
      description: pet.observations ?? undefined,
      images: images.map((img) => ({ url: img.src })),
    },
  };
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
      <p className="text-center pb-4">Seu novo amigo</p>
      <div className="rounded-lg bg-white space-y-6">
        <PetProfileAvatar
          pet={pet}
          avatarProps={{
            className: "rounded-b-none h-auto",
          }}
        />
        <div className="px-4 space-y-6">
          {!!petImages.length && (
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
              <PetSexIcon sex={pet.sex} className="size-6 p-1 -mb-1" />
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
