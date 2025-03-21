"server-only";

import * as jose from "jose";

const algorithm = "ES256";

const publicKey = `-----BEGIN PUBLIC KEY-----
${process.env.PUBLIC_TOKEN_KEY}
-----END PUBLIC KEY-----`;

if (!publicKey) {
  throw new Error("Public key not found");
}

const ecPublicKey = await jose.importSPKI(publicKey, algorithm);

export type TokenPayload = {
  id: string;
  email: string;
};

export const verifyToken = async (token: string) => {
  try {
    return await jose.jwtVerify<TokenPayload>(token, ecPublicKey);
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
};
