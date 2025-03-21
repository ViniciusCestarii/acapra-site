"server-only";

import * as jose from "jose";

const algorithm = "ES256";

// can't use node fs.readFileSync because it's not supported in the edge runtime
const publicKey = `-----BEGIN PUBLIC KEY-----
${process.env.PUBLIC_TOKEN_KEY}
-----END PUBLIC KEY-----`;

if (!publicKey) {
  throw new Error("Public key not found");
}

export type TokenPayload = {
  id: string;
  email: string;
};

export const verifyToken = async (token: string) => {
  const ecPublicKey = await jose.importSPKI(publicKey, algorithm);

  try {
    return await jose.jwtVerify<TokenPayload>(token, ecPublicKey);
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
};
