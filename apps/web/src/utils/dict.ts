import { AcapraSpecies, Pet } from "@/types/pet";

export const sexDict: Record<Pet["sex"], string> = {
  MALE: "Macho",
  FEMALE: "Fêmea",
  UNKNOWN: "Sexo Desconhecido",
};

export const statusDict: Record<Pet["status"], string> = {
  ACTIVE: "Disponível para Adoção",
  INACTIVE: "Inativo",
  ADOPTED: "Adotado",
};

export type Age = "Filhote" | "Jovem" | "Adulto" | "Idoso";

interface AgeRange {
  min: number;
  max: number;
}

export const petAgeDict: Record<AcapraSpecies, Record<Age, AgeRange>> = {
  Gato: {
    Filhote: { min: 0, max: 6 }, // 0 to 6 months
    Jovem: { min: 7, max: 24 }, // 7 months to 2 years
    Adulto: { min: 25, max: 84 }, // 2 to 7 years
    Idoso: { min: 85, max: Infinity }, // 7+ years
  },
  Cachorro: {
    Filhote: { min: 0, max: 12 }, // 0 to 12 months
    Jovem: { min: 13, max: 36 }, // 1 to 3 years
    Adulto: { min: 37, max: 96 }, // 3 to 8 years
    Idoso: { min: 97, max: Infinity }, // 8+ years
  },
};

function getPetAgeCategory(
  type: AcapraSpecies,
  ageInMonths: number,
): Age | null {
  return (
    (Object.keys(petAgeDict[type]) as Age[]).find((key) => {
      const range = petAgeDict[type][key];
      return ageInMonths >= range.min && ageInMonths <= range.max;
    }) ?? null
  );
}

function getAgeInMonths(birthDate: string | Date): number {
  const birth = new Date(birthDate);
  const today = new Date();

  const yearsDiff = today.getFullYear() - birth.getFullYear();
  const monthsDiff = today.getMonth() - birth.getMonth();

  return yearsDiff * 12 + monthsDiff;
}

export const getPetAgeCategoryByBirthDate = (
  type: AcapraSpecies,
  birthDate: string | Date,
): Age => {
  const ageInMonths = getAgeInMonths(birthDate);
  return getPetAgeCategory(type, ageInMonths) ?? "Idoso";
};
