import AcapraLogo from "@/components/icons/acapra-logo";
import Link from "next/link";
import React from "react";

const LayoutReturn = ({ children }: { children: React.ReactNode }) => {
  return (
  <>
    <div className="flex flex-row-reverse sm:fixed top-0 left-0 z-50 sm:h-full sm:w-15 sm:px-3 sm:py-2 sm:bg-secondary sm:flex-col sm:rounded-br-lg justify-between items-center px-10 pt-8">
      <Link href="/">
        <AcapraLogo small className="sm:h-auto h-7" />
      </Link>
    </div>
    {children}
  </>
  )
};

export default LayoutReturn;
