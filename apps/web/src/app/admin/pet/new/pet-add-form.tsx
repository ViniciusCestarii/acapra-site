"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
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
import { postPetPets, putPetPets } from "@/client";
import { toast } from "sonner";
import Image from "next/image";

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
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

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
        const petId = result.data.id;

        // Upload image if one was selected
        if (selectedImage) {
          try {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/pet/pets/${petId}/images`,
              {
                method: "POST",
                body: formData,
                credentials: "include",
              },
            );

            if (!response.ok) {
              throw new Error("Failed to upload image");
            }

            const imageData = await response.json();

            // Set the uploaded image as the main image
            await putPetPets({
              body: {
                id: petId,
                name: values.name,
                status: "ACTIVE",
                birthdate: values.birthdate,
                observations: values.observations || undefined,
                sex: values.sex,
                breedId: values.breedId,
                specieId: values.specieId,
                mainImageId: imageData.id,
              },
            });
          } catch (imageError) {
            console.error("Failed to upload image:", imageError);
            toast.error(
              "Pet cadastrado, mas houve erro ao fazer upload da imagem",
            );
          }
        }

        toast.success("Pet cadastrado com sucesso!");

        // Invalidate and refetch all getPetPets queries
        await queryClient.invalidateQueries({
          predicate: (query) => {
            const queryKey = query.queryKey as any;
            return queryKey?.[0]?._id === "getPetPets";
          },
        });

        router.push(`/admin/pet/${petId}`);
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Imagem do Pet</label>
          {imagePreview ? (
            <div className="space-y-2">
              <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                onClick={handleRemoveImage}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Remover Imagem
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="pet-image-upload"
              />
              <label
                htmlFor="pet-image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  Clique para adicionar uma imagem
                </span>
                <span className="text-xs text-gray-400">
                  PNG, JPG, GIF até 10MB
                </span>
              </label>
            </div>
          )}
        </div>

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
