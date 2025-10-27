import { Suspense } from "react";
import AdminPetList from "./admin-page-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center flex-1">Acapra</h1>
        <div className="flex gap-2">
          <Link href="/admin/breeds">
            <Button variant="outline" className="bg-purple-50 hover:bg-purple-100">
              Gerenciar Raças
            </Button>
          </Link>
          <Link href="/admin/pet/new">
            <Button className="bg-green-600 hover:bg-green-700">
              Adicionar Pet
            </Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminPetList />
      </Suspense>
    </div>
  );
}
