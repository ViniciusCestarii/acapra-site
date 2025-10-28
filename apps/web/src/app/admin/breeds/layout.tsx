import AcapraLogo from "@/components/icons/acapra-logo";
import Link from "next/link";
import React from "react";
import ReturnButton from "@/app/(layout-return)/return-button";

const LayoutReturn = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-row-reverse sm:fixed top-0 left-0 z-50 sm:h-full sm:w-15 sm:px-3 sm:py-2 sm:bg-secondary sm:flex-col sm:rounded-br-lg justify-between items-center px-10 pt-8">
        <Link href="/admin">
          <AcapraLogo small className="sm:h-auto h-7" />
        </Link>
      </div>
      <div className="sm:ml-14">
        <div className="md:max-w-3xl sm:max-w-2xl sm:mx-auto pb-8 sm:pt-8 px-10">
          <ReturnButton />
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutReturn;
