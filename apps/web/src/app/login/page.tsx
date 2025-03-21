import AcapraLogo from "@/components/icons/acapra-logo";
import React from "react";

const LoginPage = () => {
  return (
    <main className="container grid grid-cols-5 min-h-screen mx-auto py-28 px-10 gap-16">
      <div className="col-span-2 bg-secondary flex justify-center rounded-lg py-16 px-8">
        <AcapraLogo />
      </div>
      <div className="col-span-3 flex flex-col justify-center">
        <h1 className="text-6xl font-semibold font-nunito">Boas-vindas!</h1>
        <input></input>
        <input></input>
      </div>
    </main>
  );
};

export default LoginPage;
