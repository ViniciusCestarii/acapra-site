"use client";

import {
  getPetPetsOptions,
  getPetSpeciesOptions,
} from "../client/@tanstack/react-query.gen";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PetItem from "./pet-item";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Pet } from "@/types/pet";
import { Skeleton } from "@/components/ui/skeleton";
import useDelay from "@/hooks/useDelay";
import { Label } from "@/components/ui/label";
import ClearInput from "@/components/ui/clean-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pageSize = 9;

const PetList = () => {
  const [page, setPage] = useQueryState(
    "pagina",
    parseAsInteger.withDefault(1),
  );
  const [name, setName] = useQueryState("nome", {
    throttleMs: 400,
    ...parseAsString.withDefault(""),
  });
  const [specie, setSpecie] = useQueryState("especie", {
    ...parseAsString.withDefault(""),
  });

  const pagination = { page, pageSize };

  const petListQuery = useQuery({
    ...getPetPetsOptions({
      query: {
        ...pagination,
        name: name ? name : undefined,
        speciesId: specie ? specie : undefined,
      },
    }),
    placeholderData: keepPreviousData,
  });

  const speciesQuery = useQuery({
    ...getPetSpeciesOptions(),
    placeholderData: keepPreviousData,
  });

  const incrementPage = () => {
    const newPage = pagination.page + 1;
    if (
      !petListQuery.data ||
      newPage * pagination.pageSize > petListQuery.data.total
    )
      return;
    setPage(page + 1);
  };

  const decrementPage = () => {
    const newPage = pagination.page - 1;
    if (newPage < 1) return;
    setPage(newPage);
  };

  return (
    <main className="flex sm:flex-row flex-col">
      <section className="sm:w-xs">
        <Label htmlFor="name">Nome</Label>
        <ClearInput
          value={name}
          onChange={({ target }) => {
            setPage(1);
            setName(target.value);
          }}
          id="name"
          autoComplete="n"
        />
        <Label htmlFor="specie">Espécie</Label>
        <Select
          value={specie}
          onValueChange={(value) => {
            setPage(1);
            setSpecie(value);
          }}
        >
          <SelectTrigger id="specie">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Espécies</SelectLabel>
              {speciesQuery.data?.map((specie) => (
                <SelectItem key={specie.id} value={specie.id}>
                  {specie.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
      </section>
      <section className="flex-1">
        <Button onClick={decrementPage}>Previous Page</Button>
        <Button onClick={incrementPage}>Next Page</Button>
        <PetListBase {...petListQuery} pageSize={pageSize} />
      </section>
    </main>
  );
};

interface PetListProps {
  data:
    | {
        pets: Pet[];
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
  pageSize: number;
}

const PetListBase = ({ data, isLoading, isError, pageSize }: PetListProps) => {
  const showSkeleton = useDelay(400);

  if (isError) return <div>Ops, ocorreu um erro!</div>;
  if (isLoading)
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {showSkeleton &&
          Array.from({ length: pageSize }).map((_, i) => (
            <Skeleton key={i} className="rounded-lg p-10 aspect-[10.7/8]" />
          ))}
      </div>
    );
  if (!data) return <div>Nenhum dado encontrado</div>;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {data.pets.map((pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
