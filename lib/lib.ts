import { SignJWT, jwtVerify } from "jose";

const secretKey = "b94d27b9934d3e08a52e52d7da7dabfad3a1a3c1f0e7356e9bcf5bfe607e9f1f";
const key = new TextEncoder().encode(secretKey);


export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}