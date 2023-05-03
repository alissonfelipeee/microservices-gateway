import jwt from "jsonwebtoken";

export const generateToken = (id: number, email: string) => {
  const token = jwt.sign(
    {
      id,
      email,
    },
    "secretKey",
    {
      expiresIn: "7d",
    }
  );

  return token;
};
