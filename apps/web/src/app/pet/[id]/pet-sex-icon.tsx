import { Pet } from "@/app/types/pet";
import { CircleHelp, Mars, Venus } from "lucide-react";
import React from "react";

interface PetSexIconProps {
  sex: Pet["sex"];
  iconProps?: React.ComponentProps<typeof Mars>;
}

const PetSexIcon = ({ sex, iconProps }: PetSexIconProps) => {
  if (sex === "MALE") return <Mars {...iconProps} />;
  if (sex === "FEMALE") return <Venus {...iconProps} />;

  return <CircleHelp {...iconProps} />;
};

export default PetSexIcon;
