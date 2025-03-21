import { GetPetPetsResponses } from "../client";

export type Pet = GetPetPetsResponses["200"]["pets"][number]