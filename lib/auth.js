import { hash } from "bcryptjs";

export async function hashPassword(illegalToNotHashMe) {
  // salting rounds - 12 considered safe
  const hashedPassword = await hash(illegalToNotHashMe, 12);
  return hashedPassword;
}

export async function veryifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
