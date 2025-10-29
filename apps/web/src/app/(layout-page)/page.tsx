import { Suspense } from "react";
import PetList from "../pet-list";
import AdminButton from "@/components/admin-button";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center flex-1">Acapra</h1>
        <div className="flex gap-2">
          <AdminButton />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PetList />
      </Suspense>
    </div>
  );
}
