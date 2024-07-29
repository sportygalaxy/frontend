import express, { Express } from "express";
import "module-alias/register";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { green, white } from "console-log-colors";
import { DEFAULT_PORT } from "./src/constants";
import { EnvKeys } from "./src/common/EnvKeys";
import { errorHandler } from "./src/middleware/error";

import authRoute from "./src/routes/auth.route";
import productRoute from "./src/routes/product.route";

const app: Express = express();
const apiPath = "/api/v1";

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

if (EnvKeys.isLocal()) {
  app.use(morgan("dev"));
}

app.use(`${apiPath}/auth`, authRoute);
app.use(`${apiPath}/products`, productRoute);

app.use(errorHandler);

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(
    green.bgWhiteBright(
      `Server is running on  - ${white.bgGreenBright.bold(PORT)}`
    )
  );
});
