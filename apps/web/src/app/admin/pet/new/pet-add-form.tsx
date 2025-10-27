"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ClearInput from "@/components/ui/clean-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PetSexSelect from "@/app/pet-sex-select";
import PetSpecieSelect from "@/app/pet-specie-select";
import BreedSelect from "@/app/pet-breed-select";
import { postPetPets } from "@/client";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  sex: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
  birthdate: z.string(),
  observations: z.string().optional(),
  specieId: z.string().min(1, "A espécie é obrigatória"),
  breedId: z.string().min(1, "A raça é obrigatória"),
});

const PetAddForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sex: "UNKNOWN",
      birthdate: "",
      observations: "",
      specieId: "",
      breedId: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await postPetPets({
        body: {
          name: values.name,
          status: "ACTIVE",
          birthdate: values.birthdate,
          observations: values.observations || undefined,
          sex: values.sex,
          breedId: values.breedId,
          specieId: values.specieId,
        },
      });

      if (result.data) {
        toast.success("Pet cadastrado com sucesso!");
        router.push(`/admin/pet/${result.data.id}`);
      }
    } catch (error) {
      console.error("Failed to create pet:", error);
      toast.error("Erro ao cadastrar pet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome *</FormLabel>
              <FormControl>
                <ClearInput {...field} placeholder="Digite o nome do pet" />
              </FormControl>
            </FormItem>
          )}
        />

        <PetSexSelect
          sex={form.watch("sex")}
          setSex={(sex) => form.setValue("sex", sex)}
        />

        <FormField
          name="birthdate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento *</FormLabel>
              <FormControl>
                <input
                  type="date"
                  {...field}
                  className="border rounded-md px-2 py-1 w-full"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="observations"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Informações adicionais sobre o pet..."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <PetSpecieSelect
          specie={form.watch("specieId")}
          setSpecie={(specie) => {
            form.setValue("specieId", specie);
            form.setValue("breedId", "");
          }}
        />

        <BreedSelect
          specie={form.watch("specieId")}
          breed={form.watch("breedId")}
          setBreed={(breed) => form.setValue("breedId", breed)}
        />

        <div className="flex space-x-4 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar Pet"}
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/admin")}
            variant="outline"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PetAddForm;
