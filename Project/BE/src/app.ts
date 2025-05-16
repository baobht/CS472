import cors from "cors";
import { config } from "dotenv";
import express, { Application } from "express";
import "express-async-errors";
import morgan from "morgan";
import { setupSwagger } from "./config/swagger";
import errorHandler from "./middlewares/error.middleware";
import notFound from "./middlewares/notFound.middleware";
import aiRoutes from "./routes/ai.routes";
import productRoutes from "./routes/product.routes";
config();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
setupSwagger(app);

app.use("/api/products", productRoutes);
app.use("/api/ai", aiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
