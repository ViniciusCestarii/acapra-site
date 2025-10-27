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
import { sexDict } from "@/utils/dict";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Pet } from "@/types/pet";

interface PetSexSelectProps {
  sex: string;
  setSex: (sex: Pet["sex"]) => void;
}

const PetSexSelect = ({ sex, setSex }: PetSexSelectProps) => {
  const form = useFormContext();

  return (
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
  );
};

export default PetSexSelect;
