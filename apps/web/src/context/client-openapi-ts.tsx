"use client";

import { setOpenApiTsConfig } from "@/utils/openapi-ts";
import React from "react";

setOpenApiTsConfig();

const ClientOpenapiTs = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default ClientOpenapiTs;
