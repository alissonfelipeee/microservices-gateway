import express from "express";
import { config } from "dotenv";
import { router as userRoutes } from "./routes/router";

config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
