import { getPetPetsById } from "@/client";
import { PetAvatar, PetProfileAvatar } from "@/app/pet-item";
import { Pet } from "@/types/pet";
import { notFound } from "next/navigation";
import React from "react";
import PetSexIcon from "./pet-sex-icon";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { sexDict, getPetAgeCategoryByBirthDate, formatPetAge } from "@/utils/dict";
import { AcapraSpecies } from "@/types/pet";

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
          <div className="flex flex-col space-y-4 pb-8">
            <h1 className="font-bold text-5xl leading-9 flex items-end">
              {pet.name}
              <PetSexIcon sex={pet.sex} className="size-6 p-1 -mb-1" />
            </h1>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-600">Espécie:</span>
                  <span className="ml-2">{pet.specie.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Raça:</span>
                  <span className="ml-2">{pet.breed.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-600">Sexo:</span>
                  <span className="ml-2">{sexDict[pet.sex]}</span>
                </div>
                {pet.birthdate && (
                  <div>
                    <span className="font-semibold text-gray-600">Idade:</span>
                    <span className="ml-2">
                      {getPetAgeCategoryByBirthDate(
                        pet.specie.name as AcapraSpecies,
                        pet.birthdate
                      )}
                      {" "}({formatPetAge(pet.birthdate)})
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button asChild>
              <a
                href={
                  pet.specie.name === "Gato"
                    ? `https://docs.google.com/forms/d/e/1FAIpQLSfnidAFGv1BBlNeC8PDzZtgIgw3_TZFqlM7EIRDUW40s8B2TA/viewform?entry.535177686=${pet.name}`
                    : `https://docs.google.com/forms/d/e/1FAIpQLSc1CjkssT6hAI5Wtzjwa7uwiiq4anO8_Uf_Oo8sV0VWWiAmog/viewform?entry.535177686=${pet.name}`
                }
                target="_blank"
                rel="noreferrer"
              >
                Me adotar!
              </a>
            </Button>

            {pet.observations && (
              <div className="space-y-2">
                <h2 className="font-semibold text-lg">Sobre mim</h2>
                <p className="break-words text-gray-700">{pet.observations}</p>
              </div>
            )}
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
