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
import { statusDict } from "@/utils/dict";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Pet } from "@/types/pet";

interface PetStatusSelectProps {
  status: string;
  setStatus: (status: Pet["status"]) => void;
}

const PetStatusSelect = ({ status, setStatus }: PetStatusSelectProps) => {
  const form = useFormContext();

  return (
    <FormField
      name="status"
      control={form.control}
      render={() => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as Pet["status"]);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {Object.keys(statusDict).map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusDict[status as Pet["status"]]}
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

export default PetStatusSelect;
