import { Router, Request, Response } from "express";

const router = Router();

// Fator VI (Processes): endpoint stateless — não depende de estado em memória.
router.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
