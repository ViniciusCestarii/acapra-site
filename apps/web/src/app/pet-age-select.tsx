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
import { Age, petAgeDict } from "@/utils/dict";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AcapraSpecies } from "@/types/pet";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPetSpeciesOptions } from "@/client/@tanstack/react-query.gen";

interface PetAgeSelectProps {
  specie: string;
  age: string;
  setAge: (age: Age) => void;
}

const PetAgeSelect = ({ specie, age, setAge }: PetAgeSelectProps) => {
  const form = useFormContext();
  const speciesQuery = useQuery({
    ...getPetSpeciesOptions(),
    staleTime: 1000 * 60 * 3,
    placeholderData: keepPreviousData,
  });

  const specieName = speciesQuery.data?.find((s) => s.id === specie)?.name;

  return (
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
                setAge(value as Age);
              }}
              disabled={
                !specieName ||
                petAgeDict[specieName as AcapraSpecies] === undefined
              }
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      specieName
                        ? petAgeDict[specieName as AcapraSpecies]
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
  );
};

export default PetAgeSelect;
