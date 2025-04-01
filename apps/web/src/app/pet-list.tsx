"use client";

import { getPetPetsOptions } from "../client/@tanstack/react-query.gen";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PetItem from "./pet-item";
import { Button } from "@/components/ui/button";
import { AcapraSpecies, Pet } from "@/types/pet";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";
import PetSearch from "./pet-search";
import {
  useAge,
  useBreed,
  useName,
  usePage,
  useSex,
  useSpecie,
} from "./nuqs-state";
import { petAgeDict } from "@/utils/dict";
import { getDateMonthsAgo } from "@/utils/date";

const pageSize = 9;

const PetList = () => {
  const [page, setPage] = usePage();
  const [name] = useName();
  const [specie] = useSpecie();
  const [breed] = useBreed();
  const [sex] = useSex();
  const [age] = useAge();

  const pagination = { page, pageSize };

  const [debouncedName] = useDebounce(name, 150);

  const petListQuery = useQuery({
    ...getPetPetsOptions({
      query: {
        ...pagination,
        name: debouncedName || undefined,
        specieId: specie || undefined,
        breedId: breed || undefined,
        sex: sex || undefined,
        maxBirthdate:
          specie && age
            ? getDateMonthsAgo(
                petAgeDict["Gato" as AcapraSpecies]?.[age]?.min ?? 0,
              )
            : undefined,
        minBirthdate:
          specie && age
            ? petAgeDict["Gato" as AcapraSpecies]?.[age]?.max === Infinity
              ? undefined
              : getDateMonthsAgo(
                  petAgeDict["Gato" as AcapraSpecies]?.[age]?.max ?? 0,
                )
            : undefined,
      },
    }),
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
  });

  const incrementPage = () => {
    if (!petListQuery.data || page * pageSize >= petListQuery.data.total)
      return;
    setPage(page + 1);
  };

  const decrementPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <main className="flex sm:flex-row flex-col">
      <section className="sm:w-xs">
        <PetSearch />
      </section>
      <section className="flex-1">
        <Button onClick={decrementPage}>Previous Page</Button>
        <Button onClick={incrementPage}>Next Page</Button>
        {petListQuery.data?.total && (
          <span>Total: {petListQuery.data?.total}</span>
        )}
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
  if (isError) return <div>Ops, ocorreu um erro!</div>;
  if (isLoading)
    return (
      <div className="opacity-100 transition-all delay-500 duration-300 starting:opacity-0 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {Array.from({ length: pageSize }).map((_, i) => (
          <Skeleton
            key={i}
            className="rounded-lg p-1 bg-primary text-background flex flex-col items-center"
          >
            <div className="w-full aspect-video bg-muted rounded-lg" />{" "}
            {/* Simulates Avatar */}
            <div className="size-10 -mt-4 bg-primary rounded-md" />{" "}
            {/* Simulates Icon */}
            <div className="h-6 w-1/2 mt-2" /> {/* Simulates Name */}
          </Skeleton>
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
