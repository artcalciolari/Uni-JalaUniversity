import dotenv from "dotenv";

// Fator III (Config): carrega variáveis de ambiente do .env apenas em dev.
// Em produção, as variáveis devem ser injetadas pelo ambiente de execução.
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

interface AppConfig {
  port: number;
  nodeEnv: string;
}

function loadConfig(): AppConfig {
  const port = Number(process.env.PORT);
  if (!port || isNaN(port)) {
    console.error("FATAL: variável de ambiente PORT é obrigatória e deve ser numérica");
    process.exit(1);
  }

  return {
    port,
    nodeEnv: process.env.NODE_ENV || "development",
  };
}

export const config = loadConfig();
