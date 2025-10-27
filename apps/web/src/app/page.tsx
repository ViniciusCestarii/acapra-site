import { Suspense } from "react";
import PetList from "./pet-list";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Acapra</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PetList />
      </Suspense>
    </div>
  );
}
