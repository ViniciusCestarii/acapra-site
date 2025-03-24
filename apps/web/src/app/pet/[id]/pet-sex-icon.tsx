import { Pet } from "@/types/pet";
import { Tip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleHelp, Mars, Venus } from "lucide-react";
import React from "react";

interface PetSexIconProps {
  sex: Pet["sex"];
  className?: string;
}

const PetSexIcon = ({ sex, className }: PetSexIconProps) => {
  let content;

  switch (sex) {
    case "MALE":
      content = {
        icon: <Mars className="w-auto h-auto" />,
        tooltipContent: "Macho",
      };
      break;
    case "FEMALE":
      content = {
        icon: <Venus className="w-auto h-auto" />,
        tooltipContent: "Fêmea",
      };
      break;
    default:
      content = {
        icon: <CircleHelp className="w-auto h-auto" />,
        tooltipContent: "Sexo desconhecido",
      };
      break;
  }

  return (
    <Tip content={content.tooltipContent} className={cn(className, "flex")}>
      {content.icon}
    </Tip>
  );
};

export default PetSexIcon;
