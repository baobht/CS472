import cors from "cors";
import express, { Application } from "express";
import "express-async-errors";
import morgan from "morgan";
import errorHandler from "./middlewares/error.middleware";
import notFound from "./middlewares/notFound.middleware";
import userRoutes from "./routes/user.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
