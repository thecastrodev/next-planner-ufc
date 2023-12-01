import express from "express"
import cors from "cors"
import dataRoutes from "./routes/data.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", dataRoutes)

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
