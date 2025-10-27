"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPetSpeciesOptions,
  getPetSpeciesByIdBreedsOptions,
} from "@/client/@tanstack/react-query.gen";
import {
  postPetBreeds,
  putPetBreeds,
  deletePetBreedsById,
} from "@/client";
import { Button } from "@/components/ui/button";
import ClearInput from "@/components/ui/clean-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Breed } from "@/types/pet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const BreedsManagementPage = () => {
  const [selectedSpecieId, setSelectedSpecieId] = useState<string>("");
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [breedToDelete, setBreedToDelete] = useState<Breed | null>(null);

  const queryClient = useQueryClient();

  const speciesQuery = useQuery({
    ...getPetSpeciesOptions(),
    staleTime: 1000 * 60 * 3,
  });

  const breedsQuery = useQuery({
    ...getPetSpeciesByIdBreedsOptions({
      path: {
        id: selectedSpecieId,
      },
    }),
    enabled: !!selectedSpecieId,
    staleTime: 1000 * 60 * 3,
  });

  const handleOpenCreateDialog = () => {
    setEditingBreed(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (breed: Breed) => {
    setEditingBreed(breed);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBreed(null);
  };

  const handleOpenDeleteDialog = (breed: Breed) => {
    setBreedToDelete(breed);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setBreedToDelete(null);
  };

  const refetchBreeds = async () => {
    if (selectedSpecieId) {
      await queryClient.invalidateQueries({
        queryKey: ["getPetSpeciesByIdBreeds", { path: { id: selectedSpecieId } }],
      });
      await breedsQuery.refetch();
    }
  };

  return (
    <>
      <p className="text-center pb-4">Gerenciar Raças</p>
      <div className="rounded-lg bg-white p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Raças</h1>

        {speciesQuery.isError && (
          <Alert variant="destructive">
            <AlertTitle>Erro ao carregar espécies</AlertTitle>
            <AlertDescription>
              Não foi possível carregar a lista de espécies. Tente recarregar a
              página.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Selecione uma Espécie *
            </label>
            <Select
              value={selectedSpecieId}
              onValueChange={setSelectedSpecieId}
              disabled={speciesQuery.isLoading || speciesQuery.isError}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    speciesQuery.isLoading
                      ? "Carregando..."
                      : "Escolha uma espécie"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {speciesQuery.data?.map((specie) => (
                  <SelectItem key={specie.id} value={specie.id}>
                    {specie.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedSpecieId && (
            <div className="flex justify-end">
              <Button
                onClick={handleOpenCreateDialog}
                className="bg-green-600 hover:bg-green-700"
              >
                Adicionar Nova Raça
              </Button>
            </div>
          )}
        </div>

        {selectedSpecieId && (
          <div className="border rounded-lg">
            {breedsQuery.isError && (
              <div className="p-4">
                <Alert variant="destructive">
                  <AlertTitle>Erro ao carregar raças</AlertTitle>
                  <AlertDescription>
                    Não foi possível carregar a lista de raças. Tente
                    novamente.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {breedsQuery.isLoading && !breedsQuery.isError && (
              <div className="p-8 text-center text-gray-500">
                Carregando raças...
              </div>
            )}

            {!breedsQuery.isLoading &&
              !breedsQuery.isError &&
              breedsQuery.data &&
              breedsQuery.data.length > 0 && (
                <div className="divide-y">
                  {breedsQuery.data.map((breed) => (
                    <div
                      key={breed.id}
                      className="p-4 flex justify-between items-center hover:bg-gray-50"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{breed.name}</h3>
                        <p className="text-sm text-gray-500">ID: {breed.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleOpenEditDialog(breed)}
                          variant="outline"
                          size="sm"
                          className="bg-blue-50 hover:bg-blue-100"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleOpenDeleteDialog(breed)}
                          variant="outline"
                          size="sm"
                          className="bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {!breedsQuery.isLoading &&
              !breedsQuery.isError &&
              (!breedsQuery.data || breedsQuery.data.length === 0) && (
                <div className="p-8 text-center text-gray-500">
                  Nenhuma raça cadastrada para esta espécie.
                </div>
              )}
          </div>
        )}
      </div>

      <BreedDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        breed={editingBreed}
        specieId={selectedSpecieId}
        onSuccess={refetchBreeds}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        breed={breedToDelete}
        onSuccess={refetchBreeds}
      />
    </>
  );
};

interface BreedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  breed: Breed | null;
  specieId: string;
  onSuccess: () => void;
}

const BreedDialog: React.FC<BreedDialogProps> = ({
  isOpen,
  onClose,
  breed,
  specieId,
  onSuccess,
}) => {
  const [name, setName] = useState(breed?.name || "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setName(breed?.name || "");
    setError(null);
  }, [breed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("O nome da raça é obrigatório");
      return;
    }

    setIsLoading(true);
    try {
      if (breed) {
        const result = await putPetBreeds({
          body: {
            id: breed.id,
            name: name.trim(),
            specieId: specieId,
          },
        });

        if (result.error) {
          throw new Error(
            (result.error as { message?: string })?.message ||
              "Erro ao atualizar raça",
          );
        }

        toast.success("Raça atualizada com sucesso!");
      } else {
        const result = await postPetBreeds({
          body: {
            name: name.trim(),
            specieId: specieId,
          },
        });

        if (result.error) {
          throw new Error(
            (result.error as { message?: string })?.message ||
              "Erro ao criar raça",
          );
        }

        toast.success("Raça criada com sucesso!");
      }
      onSuccess();
      onClose();
      setName("");
    } catch (error) {
      console.error("Failed to save breed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao salvar raça. Tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {breed ? "Editar Raça" : "Adicionar Nova Raça"}
          </DialogTitle>
          <DialogDescription>
            {breed
              ? "Atualize as informações da raça."
              : "Adicione uma nova raça para a espécie selecionada."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nome da Raça *
            </label>
            <ClearInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da raça"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Salvando..." : breed ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  breed: Breed | null;
  onSuccess: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  breed,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (!breed) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await deletePetBreedsById({
        path: {
          id: breed.id,
        },
      });

      if (result.error) {
        throw new Error(
          (result.error as { message?: string })?.message ||
            "Erro ao excluir raça. Pode haver pets associados a esta raça.",
        );
      }

      toast.success("Raça excluída com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to delete breed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao excluir raça. Pode haver pets associados a esta raça.",
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
            Tem certeza que deseja excluir a raça "{breed?.name}"? Esta ação
            não pode ser desfeita.
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

export default BreedsManagementPage;
