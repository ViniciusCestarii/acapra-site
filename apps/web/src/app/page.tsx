import { Suspense } from "react";
import PetList from "./pet-list";

export default function Home() {
  return (
    <div>
      <Suspense>
        <PetList />
      </Suspense>
    </div>
  );
}
