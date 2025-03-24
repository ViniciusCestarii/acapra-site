"use client";

import { useEffect, useState } from "react";
import { getPetPetsOptions } from "../client/@tanstack/react-query.gen";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PetItem from "./pet-item";
import { Button } from "@/components/ui/button";
import { Pet } from "@/types/pet";
import { Skeleton } from "@/components/ui/skeleton";

const pageSize = 9;

const PetList = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize });

  const query = useQuery({
    ...getPetPetsOptions({
      query: pagination,
    }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const incrementPage = () => {
    const newPage = pagination.page + 1;
    if (!query.data || newPage * pagination.pageSize > query.data.total) return;
    setPagination({ ...pagination, page: pagination.page + 1 });
  };

  const decrementPage = () => {
    const newPage = pagination.page - 1;
    if (newPage < 1) return;
    setPagination({ ...pagination, page: newPage });
  };

  return (
    <section>
      <Button onClick={decrementPage}>Previous Page</Button>
      <Button onClick={incrementPage}>Next Page</Button>
      <PetListBase {...query} pageSize={pageSize} showSkeleton={showSkeleton} />
    </section>
  );
};

interface PetListProps {
  data:
    | {
        pets: Pet[];
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
  showSkeleton: boolean;
  pageSize: number;
}

const PetListBase = ({
  data,
  isLoading,
  isError,
  pageSize,
  showSkeleton,
}: PetListProps) => {
  if (isError) return <div>Ops, ocorreu um erro!</div>;
  if (isLoading)
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {showSkeleton &&
          Array.from({ length: pageSize }).map((_, i) => (
            <Skeleton key={i} className="rounded-lg p-10 aspect-[10.7/8]" />
          ))}
      </div>
    );
  if (!data) return <div>Nenhum dado encontrado</div>;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {data.pets.map((pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
