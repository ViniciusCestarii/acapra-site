import { client } from "../client/client.gen";

export const setOpenApiTsConfig = () => {
  client.setConfig({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  });
};
