import bcrypt from "bcrypt";

export async function compareHash(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
