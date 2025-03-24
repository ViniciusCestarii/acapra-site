import AcapraLogo from "@/components/icons/acapra-logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const LayoutReturn = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="sm:flex hidden fixed top-0 left-0 z-50 h-3/4 w-15 px-3 py-2 bg-secondary flex-col justify-between items-center rounded-br-lg">
        <Link href="/">
          <AcapraLogo small />
        </Link>
        <Button asChild size="icon">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
      </div>
      <div className="sm:hidden flex justify-between items-center px-10 pt-8">
        <Button asChild size="icon">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <Link href="/">
          <AcapraLogo className="h-7" small />
        </Link>
      </div>
      <div className="sm:ml-14">
        <div className="md:max-w-3xl sm:max-w-2xl sm:mx-auto pb-8 sm:pt-8 px-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutReturn;
