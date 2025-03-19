"use client"

import { useState } from 'react'
import { getPetPetsOptions } from './client/@tanstack/react-query.gen';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const PetList = () => {
  const [pagination, setPagination] = useState({page: 1, pageSize: 10})

  const { data, isLoading,  error } = useQuery({
    ...getPetPetsOptions({
      query: pagination
    }),
    placeholderData: keepPreviousData
  });

  if (error) return <div>Error: {error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>No data</div>

  const incrementPage = () => {
    const newPage = pagination.page + 1
    if (newPage * pagination.pageSize > data.total) return
    setPagination({...pagination, page: pagination.page + 1})
  }

  const decrementPage = () => {
    const newPage = pagination.page - 1
    if (newPage < 1) return
    setPagination({...pagination, page: newPage})
  }

  return (
    <section>
      <button onClick={decrementPage}>
        Previous Page
      </button>
      <button onClick={incrementPage}>
        Next Page
      </button>
      <div>
        {data.pets.map((pet) => (
          <article key={pet.id}>
            <h2>{pet.name}</h2>
            <p>{pet.sex}</p>
            <p>{pet.birthdate}</p>
            <p>{pet.observations}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PetList