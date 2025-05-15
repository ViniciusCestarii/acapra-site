import { GetPetPetsResponses, PostPetPetsResponses } from "@/client";

export type Pet = GetPetPetsResponses["200"]["pets"][number];

export type PetSex = PostPetPetsResponses["200"]["sex"];

export type Specie = GetPetPetsResponses["200"]["pets"][number]["specie"];

export type Breed = GetPetPetsResponses["200"]["pets"][number]["breed"];

export type AcapraSpecies = "Gato" | "Cachorro";
