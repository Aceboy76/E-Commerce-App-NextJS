import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);


export async function encrypt<T>(payload: T): Promise<string> {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt<T>(input: string): Promise<T> {
  
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as T;
}