import React from "react";
import { setOpenApiTsConfig } from "@/utils/openapi-ts";

setOpenApiTsConfig();

const OpenapiTs = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default OpenapiTs;
