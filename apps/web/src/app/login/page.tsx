import AcapraLogo from "@/components/icons/acapra-logo";
import Pets from "@/components/icons/pets";
import { Input } from "@/components/ui/input";
import ShowHideInput from "@/components/ui/show-hide-input";
import React from "react";

const LoginPage = () => {
  return (
    <main className="container grid grid-cols-5 min-h-screen mx-auto py-28 px-10 gap-16">
      <div className="col-span-2 bg-secondary flex flex-col justify-between items-center rounded-lg py-16 px-12">
        <AcapraLogo />
        <Pets />
      </div>
      <div className="col-span-3 flex flex-col pt-24 space-y-10">
        <h1 className="text-6xl leading-12 font-semibold font-nunito">
          Boas-vindas!
        </h1>
        <ShowHideInput className="px-4 py-8" />
        <Input type="password" className="px-4 py-8" />
      </div>
    </main>
  );
};

export default LoginPage;
