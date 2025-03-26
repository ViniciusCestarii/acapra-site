import { Pet } from "@/types/pet";
import { Tip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleHelp, Mars, Venus } from "lucide-react";
import React from "react";
import { sexDict } from "@/utils/dict";

interface PetSexIconProps {
  sex: Pet["sex"];
  className?: string;
}

const PetSexIcon = ({ sex, className }: PetSexIconProps) => {
  let icon;

  switch (sex) {
    case "MALE":
      icon = <Mars className="w-auto h-auto" />;
      break;
    case "FEMALE":
      icon = <Venus className="w-auto h-auto" />;
      break;
    default:
      icon = <CircleHelp className="w-auto h-auto" />;
      break;
  }

  return (
    <Tip content={sexDict[sex]} className={cn(className, "flex")}>
      {icon}
    </Tip>
  );
};

export default PetSexIcon;
