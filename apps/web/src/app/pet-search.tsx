import {
  getPetSpeciesByIdBreedsOptions,
  getPetSpeciesOptions,
} from "@/client/@tanstack/react-query.gen";
import ClearInput from "@/components/ui/clean-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Age, petAgeDict, sexDict } from "@/utils/dict";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useAge,
  useBreed,
  useName,
  usePage,
  useSex,
  useSpecie,
} from "./nuqs-state";
import { AcapraSpecies, Pet } from "@/types/pet";

const formSchema = z.object({
  name: z.string().optional(),
  specie: z.string().optional(),
  breed: z.string().optional(),
  sex: z.enum(Object.keys(sexDict) as [Pet["sex"], ...Pet["sex"][]]).optional(),
  age: z.enum(Object.keys(petAgeDict.Gato) as [Age, ...Age[]]).optional(),
});

const PetSearch = () => {
  const [_page, setPage] = usePage();
  const [name, setName] = useName();
  const [specie, setSpecie] = useSpecie();
  const [breed, setBreed] = useBreed();
  const [sex, setSex] = useSex();
  const [age, setAge] = useAge();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name, specie, breed },
  });

  return (
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
                  setAge("");
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

        <FormField
          name="age"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Select
                  value={age}
                  onValueChange={(value) => {
                    setPage(1);
                    setAge(value as Age);
                  }}
                  disabled={
                    !specie || petAgeDict[specie as AcapraSpecies] === undefined
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          specie
                            ? petAgeDict[specie as AcapraSpecies]
                              ? "Selecione uma idade"
                              : "Espécie não suportada"
                            : "Selecione um espécie primeiro"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Idades</SelectLabel>
                      {Object.keys(petAgeDict.Gato).map((age) => (
                        <SelectItem key={age} value={age}>
                          {age}
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
  );
};

export default PetSearch;
