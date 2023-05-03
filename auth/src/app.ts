import express from "express";
import { config } from "dotenv";
import { authRouter } from "./routes/router";

config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
