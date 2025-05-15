import express from "express";
import path from "path";
import indexRoutes from "./routes/index.js";

const app = express();
const PORT = 3001;

app.use("/public", express.static(path.resolve("src/public")));
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
