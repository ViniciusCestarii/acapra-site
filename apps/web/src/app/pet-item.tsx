import React from "react";
import { Pet } from "./types/pet";
interface PetItem {
  pet: Pet;
}

const PetItem = ({ pet }: PetItem) => {
  const petProfileImage = pet.images.find((img) => img.id === pet.mainImageId);
  return (
    <article key={pet.id}>
      <h2>{pet.name}</h2>
      <p>{pet.sex}</p>
      <p>{pet.birthdate}</p>
      <p>{pet.observations}</p>
      {petProfileImage && (
        <img
          key={petProfileImage.id}
          src={petProfileImage.src}
          alt={pet.name}
        />
      )}
    </article>
  );
};

export default PetItem;
