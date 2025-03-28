import { Pet } from "@/types/pet";
import { sexDict } from "@/utils/dict";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";

export const usePage = () => {
  return useQueryState("pagina", parseAsInteger.withDefault(1));
};

export const useName = () => {
  return useQueryState("nome", {
    throttleMs: 400,
    ...parseAsString.withDefault(""),
  });
};

export const useSpecie = () => {
  return useQueryState("especie", {
    ...parseAsString.withDefault(""),
  });
};

export const useBreed = () => {
  return useQueryState("raça", {
    ...parseAsString.withDefault(""),
  });
};

export const useSex = () => {
  return useQueryState("sexo", {
    ...parseAsStringEnum<Pet["sex"] | "">(
      Object.keys(sexDict) as Pet["sex"][],
    ).withDefault(""),
  });
};
