"use client";

import {
  getPetPetsOptions,
  getPetSpeciesByIdBreedsOptions,
  getPetSpeciesOptions,
} from "../client/@tanstack/react-query.gen";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PetItem from "./pet-item";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";
import { Button } from "@/components/ui/button";
import { Pet } from "@/types/pet";
import { Skeleton } from "@/components/ui/skeleton";
import useDelay from "@/hooks/useDelay";
import ClearInput from "@/components/ui/clean-input";
import { useDebounce } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sexDict } from "@/utils/dict";
import { startTransition } from "react";

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
  const [breed, setBreed] = useQueryState("raça", {
    ...parseAsString.withDefault(""),
  });
  const [sex, setSex] = useQueryState("sexo", {
    ...parseAsStringEnum<Pet["sex"] | "">(
      Object.keys(sexDict) as Pet["sex"][],
    ).withDefault(""),
  });

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
      },
    }),
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
  });

  const speciesQuery = useQuery({
    ...getPetSpeciesOptions(),
    placeholderData: keepPreviousData,
  });

  const breedQuery = useQuery({
    ...getPetSpeciesByIdBreedsOptions({
      path: {
        id: specie,
      },
    }),
    staleTime: 1000 * 60 * 3,
    enabled: !!specie,
    placeholderData: keepPreviousData,
  });

  const incrementPage = () => {
    if (!petListQuery.data || (page + 1) * pageSize > petListQuery.data.total)
      return;
    setPage(page + 1);
  };

  const decrementPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const formSchema = z.object({
    name: z.string().optional(),
    specie: z.string().optional(),
    breed: z.string().optional(),
    sex: z.enum(["MALE", "FEMALE", "UNKNOWN"]).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name, specie, breed },
  });

  return (
    <main className="flex sm:flex-row flex-col">
      <section className="sm:w-xs">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <ClearInput
                      {...field}
                      value={name}
                      onChange={(e) => {
                        setPage(1);
                        setName(e.target.value);
                      }}
                      autoComplete="n"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="specie"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Espécie</FormLabel>
                  <Select
                    value={specie}
                    onValueChange={(value) => {
                      setPage(1);
                      setSpecie(value);
                      setBreed("");
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma espécie" />
                      </SelectTrigger>
                    </FormControl>
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
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="breed"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Raça</FormLabel>
                  <FormControl>
                    <Select
                      value={breed}
                      onValueChange={(value) => {
                        setPage(1);
                        setBreed(value);
                      }}
                      disabled={!specie}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              specie
                                ? "Selecione uma raça"
                                : "Selecione um espécie primeiro"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Raças</SelectLabel>
                          {breedQuery.data?.map((breed) => (
                            <SelectItem key={breed.id} value={breed.id}>
                              {breed.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="sex"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Select
                      value={sex}
                      onValueChange={(value) => {
                        setPage(1);
                        console.log(value);
                        setSex(value as Pet["sex"]);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um sexo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sexos</SelectLabel>
                          {Object.keys(sexDict).map((sex) => (
                            <SelectItem key={sex} value={sex}>
                              {sexDict[sex as Pet["sex"]]}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
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
