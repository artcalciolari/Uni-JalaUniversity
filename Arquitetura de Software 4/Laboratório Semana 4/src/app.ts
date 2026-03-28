import express from "express";
import healthRouter from "./routes/health";

const app = express();

// Fator XI (Logs): usa middleware de logging direto no stdout.
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(healthRouter);

export default app;
