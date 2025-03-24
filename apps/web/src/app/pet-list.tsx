"use client";

import { useState } from "react";
import { getPetPetsOptions } from "../client/@tanstack/react-query.gen";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PetItem from "./pet-item";
import { Button } from "@/components/ui/button";

const PetList = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 9 });

  const { data, isLoading, error } = useQuery({
    ...getPetPetsOptions({
      query: pagination,
    }),
    placeholderData: keepPreviousData,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const incrementPage = () => {
    const newPage = pagination.page + 1;
    if (newPage * pagination.pageSize > data.total) return;
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
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {data.pets.map((pet) => (
          <PetItem key={pet.id} pet={pet} />
        ))}
      </div>
    </section>
  );
};

export default PetList;
