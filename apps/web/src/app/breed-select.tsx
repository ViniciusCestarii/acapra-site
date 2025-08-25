import { getPetSpeciesByIdBreedsOptions } from "@/client/@tanstack/react-query.gen";
import {
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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useFormContext } from "react-hook-form";

interface BreedSelectProps {
  specie: string;
  breed: string;
  setBreed: (breed: string) => void;
}

const BreedSelect = ({ specie, breed, setBreed }: BreedSelectProps) => {
  const form = useFormContext();
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

  return (
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
  );
};

export default BreedSelect;
