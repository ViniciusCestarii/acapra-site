import AcapraLogo from "@/components/icons/acapra-logo";
import Pets from "@/components/icons/pets";
import React from "react";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <main className="flex sm:flex-row flex-col lg:space-x-30 sm:space-x-12 min-h-screen mx-auto sm:py-28 py-14">
      <div className="lg:w-[34rem] sm:w-[22rem] w-full sm:bg-secondary flex flex-col justify-between items-center rounded-lg sm:py-14 pb-14 px-12">
        <AcapraLogo className="sm:size-32 size-24" />
        <Pets className="sm:flex hidden" />
      </div>
      <div className="flex-1 flex flex-col sm:pt-24 space-y-10 max-w-xl">
        <h1 className="sm:text-6xl text-5xl leading-12 font-bold">
          Boas-vindas!
        </h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
