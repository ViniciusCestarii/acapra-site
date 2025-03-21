import React from "react";
import { Pet } from "./types/pet";
interface PetItem {
  pet: Pet;
}

const PetItem = ({ pet }: PetItem) => {
  return (
    <article key={pet.id}>
      <h2>{pet.name}</h2>
      <p>{pet.sex}</p>
      <p>{pet.birthdate}</p>
      <p>{pet.observations}</p>
      {pet.images.map((image) => (
        <img key={image.id} src={image.src} alt={pet.name} />
      ))}
    </article>
  );
};

export default PetItem;
