"use client";

import { getPetPetsOptions } from "../client/@tanstack/react-query.gen";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PetItem from "./pet-item";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Pet } from "@/types/pet";
import { Skeleton } from "@/components/ui/skeleton";
import useDelay from "@/hooks/useDelay";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  const pagination = { page, pageSize };

  const query = useQuery({
    ...getPetPetsOptions({
      query: { ...pagination, name },
    }),
    placeholderData: keepPreviousData,
  });

  const incrementPage = () => {
    const newPage = pagination.page + 1;
    if (!query.data || newPage * pagination.pageSize > query.data.total) return;
    setPage(page + 1);
  };

  const decrementPage = () => {
    const newPage = pagination.page - 1;
    if (newPage < 1) return;
    setPage(newPage);
  };

  return (
    <main className="flex">
      <section className="w-xs">
        <Label htmlFor="name">Nome</Label>
        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
          id="name"
          placeholder="Nome"
        />
      </section>
      <section className="flex-1">
        <Button onClick={decrementPage}>Previous Page</Button>
        <Button onClick={incrementPage}>Next Page</Button>
        <PetListBase {...query} pageSize={pageSize} />
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
