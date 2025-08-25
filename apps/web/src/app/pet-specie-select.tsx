import { getPetSpeciesOptions } from "@/client/@tanstack/react-query.gen";
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

interface PetSpecieSelectProps {
  specie: string;
  setSpecie: (specie: string) => void;
}

const PetSpecieSelect = ({ specie, setSpecie }: PetSpecieSelectProps) => {
  const form = useFormContext();
  const speciesQuery = useQuery({
    ...getPetSpeciesOptions(),
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
  });

  return (
    <FormField
      name="specie"
      control={form.control}
      render={() => (
        <FormItem>
          <FormLabel>Espécie</FormLabel>
          <Select
            value={specie}
            onValueChange={(value) => {
              setSpecie(value);
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
  );
};

export default PetSpecieSelect;
