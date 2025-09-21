import express from "express";
import UseWorkana from "../controllers/useWorkana.js";

const port = 3000;
const controllerWorkana = new UseWorkana();
const app = express();
app.use(express.json());

app.get("/healthcheck", async (req, res) => {
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  controllerWorkana.execute();
});
