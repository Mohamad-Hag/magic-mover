import { Express } from "express";
import app from "./app";
import itemRoutes from "./layers/routes/itemRoutes.route";
import moverRoutes from "./layers/routes/moverRoutes.route";
import logRoutes from "./layers/routes/logRoutes.route";

function init(app: Express) {
  app.use("/api/items", itemRoutes);
  app.use("/api/movers", moverRoutes);
  app.use("/api/logs", logRoutes);
}

app(init);
