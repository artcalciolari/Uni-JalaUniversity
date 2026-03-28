import { config } from "./config";
import app from "./app";
import http from "http";

const server = http.createServer(app);

// Fator VII (Port Binding): vincula o serviço HTTP a uma porta do ambiente.
server.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port} [${config.nodeEnv}]`);
});

// Fator IX (Disposability): desligamento gracioso ao receber sinais do SO.
function gracefulShutdown(signal: string): void {
  console.log(`\n${signal} recebido. Encerrando servidor...`);
  server.close(() => {
    console.log("Conexões encerradas. Processo finalizado.");
    process.exit(0);
  });

  // Se não fechar em 10s, força saída.
  setTimeout(() => {
    console.error("Timeout no shutdown. Forçando saída.");
    process.exit(1);
  }, 10_000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
