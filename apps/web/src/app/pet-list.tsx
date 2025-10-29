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
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Search Section */}
        <aside className="lg:w-1/4 w-full bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Econtre o seu pet</h2>
          <PetSearch />
        </aside>

        {/* Pet List Section */}
        <main className="lg:w-3/4 w-full min-h-[745px]">
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={decrementPage}
                disabled={page <= 1}
                variant="outline"
                size="sm"
              >
                Anterior
              </Button>
              <span className="text-sm font-medium">Página {page}</span>
              <Button
                onClick={incrementPage}
                disabled={
                  !petListQuery.data ||
                  page * pageSize >= petListQuery.data.total
                }
                variant="outline"
                size="sm"
              >
                Próximo
              </Button>
            </div>

            {petListQuery.data?.total !== undefined && (
              <span className="text-sm text-gray-600">
                Total: {petListQuery.data?.total} pets
              </span>
            )}
          </div>

          {/* Pet Grid */}
          <PetListBase {...petListQuery} pageSize={pageSize} />
        </main>
      </div>
    </div>
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
  if (isError)
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-500 font-medium">Ops, ocorreu um erro!</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {Array.from({ length: pageSize }).map((_, i) => (
          <Skeleton
            key={i}
            className="relative rounded-lg p-4 bg-gray-100 text-background flex flex-col items-center h-64"
          >
            <div className="absolute top-0 right-0 z-10 bg-primary size-8 rounded-bl-lg rounded-tr-lg" />
            <div className="w-full aspect-video bg-gray-200 rounded-lg" />
            <div className="size-12 -mt-4 bg-gray-300 rounded-full" />
            <div className="h-6 w-24 mt-2 bg-gray-200 rounded" />
          </Skeleton>
        ))}
      </div>
    );

  if (!data?.pets?.length)
    return (
      <div className="text-center p-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          Nenhum pet encontrado com esses critérios.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Tente ajustar os filtros de busca.
        </p>
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      {data.pets.map((pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
