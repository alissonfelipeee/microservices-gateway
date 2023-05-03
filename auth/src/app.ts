import express from "express";
import { config } from "dotenv";
import { authRouter } from "./routes/router";
import { consumer } from "./kafka/consumer";

config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

consumer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
