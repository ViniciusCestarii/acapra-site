import { Pet } from "@/types/pet";

export const sexDict: Record<Pet["sex"], string> = {
  MALE: "Macho",
  FEMALE: "Fêmea",
  UNKNOWN: "Sexo Desconhecido",
};
