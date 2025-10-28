"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Pet } from "@/types/pet";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PetSexSelect from "@/app/pet-sex-select";
import PetSpecieSelect from "@/app/pet-specie-select";
import BreedSelect from "@/app/pet-breed-select";
import { putPetPets, deletePetPetsById } from "@/client";
import { toast } from "sonner";

interface PetEditWrapperProps {
  pet: Pet;
}

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  sex: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
  birthdate: z.string(),
  observations: z.string().optional(),
  specieId: z.string(),
  breedId: z.string(),
});

const PetEditWrapper: React.FC<PetEditWrapperProps> = ({ pet }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pet.name,
      sex: pet.sex,
      birthdate: new Date(pet.birthdate).toISOString().split("T")[0],
      observations: pet.observations || "",
      specieId: pet.specieId,
      breedId: pet.breedId,
    },
  });

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const updated = await putPetPets({
        body: {
          id: pet.id,
          name: values.name,
          status: pet.status,
          birthdate: values.birthdate,
          observations: values.observations || undefined,
          sex: values.sex,
          mainImageId: pet.mainImageId || undefined,
          breedId: values.breedId,
          specieId: values.specieId,
        },
      });

      if (updated.data) {
        toast.success("Pet atualizado com sucesso");
        router.refresh();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update pet:", error);
      toast.error("Erro ao atualizar pet");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <ClearInput {...field} />
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
                  <FormLabel>Data de Nascimento</FormLabel>
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
                    <Textarea {...field} rows={4} />
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

            <div className="flex space-x-4 pt-4 pb-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-5xl leading-9 flex items-end">
              {pet.name}
            </h1>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Editar Pet
              </Button>
              <Button
                onClick={handleOpenDeleteDialog}
                variant="destructive"
              >
                Deletar Pet
              </Button>
            </div>
          </div>
          <p className="break-words">{pet.observations}</p>
          <div>
            <div className="text-base">
              <strong>Data de Nascimento:</strong>{" "}
              {pet.birthdate
                ? new Date(pet.birthdate).toLocaleDateString()
                : "—"}
            </div>
            <div className="text-base">
              <strong>Raça:</strong> {pet.breed.name}
            </div>
            <div className="text-base">
              <strong>Espécie:</strong> {pet.specie.name}
            </div>
          </div>
        </>
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        pet={pet}
      />
    </div>
  );
};

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  pet,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await deletePetPetsById({
        path: {
          id: pet.id,
        },
      });

      if (result.error) {
        throw new Error(
          (result.error as { message?: string })?.message ||
            "Erro ao excluir pet.",
        );
      }

      toast.success("Pet excluído com sucesso!");
      onClose();

      // Invalidate and refetch all getPetPets queries with matching _id
      await queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as any;
          return queryKey?.[0]?._id === "getPetPets";
        },
      });

      // Navigate back to admin page
      router.push("/admin");
    } catch (error) {
      console.error("Failed to delete pet:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao excluir pet. Tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o pet "{pet.name}"? Esta ação não
            pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetEditWrapper;
