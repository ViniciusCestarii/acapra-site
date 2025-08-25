"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pet } from "@/types/pet";
import PetSexIcon from "./pet-sex-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postPetPets } from "@/client";

interface PetEditWrapperProps {
  pet: Pet;
}

const PetEditWrapper: React.FC<PetEditWrapperProps> = ({ pet }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [petData, setPetData] = useState<Pet>(pet);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setPetData(pet);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updated = await postPetPets({
        body: {
          name: petData.name,
          birthdate: petData.birthdate,
          observations: petData.observations || undefined,
          sex: petData.sex as "MALE" | "FEMALE" | "UNKNOWN",
          mainImageId: petData.mainImageId || undefined,
          breedId: petData.breedId,
          specieId: petData.specieId,
        },
      });

      if (updated.data) {
        alert("Pet updated successfully");

        router.refresh();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update pet:", error);
      alert("Failed to update pet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {isEditing ? (
        <>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <Input
                id="name"
                name="name"
                value={petData.name || ""}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700"
              >
                Sexo
              </label>
              <Select
                value={petData.sex}
                onValueChange={(value) => handleSelectChange("sex", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Masculino</SelectItem>
                  <SelectItem value="FEMALE">Feminino</SelectItem>
                  <SelectItem value="UNKNOWN">Desconhecido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-700"
              >
                Data de Nascimento
              </label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={
                  petData.birthdate
                    ? new Date(petData.birthdate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="observations"
                className="block text-sm font-medium text-gray-700"
              >
                Observações
              </label>
              <Textarea
                id="observations"
                name="observations"
                value={petData.observations || ""}
                onChange={handleChange}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4 pb-4">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-5xl leading-9 flex items-end">
              {pet.name}
              <PetSexIcon sex={pet.sex} className="size-6 p-1 -mb-1" />
            </h1>
            <Button
              onClick={handleEdit}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Editar Pet
            </Button>
          </div>
          <p className="break-words">{pet.observations}</p>
          <div>
            <div className="text-base">
              <strong>Data de Nascimento:</strong>{" "}
              {new Date(pet.birthdate).toLocaleDateString()}
            </div>
            <div className="text-base">
              <strong>Raça:</strong> {pet.breed.name}
            </div>
            <div className="text-base">
              <strong>Espécie:</strong> {pet.specie.name}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PetEditWrapper;
