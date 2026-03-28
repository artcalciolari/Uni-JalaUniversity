# Twelve-Factor App — Fatores Implementados

Este documento mapeia as práticas implementadas neste projeto a cada um dos fatores
do manifesto [Twelve-Factor App](https://12factor.net).

---

## I. Codebase — Um codebase rastreado em controle de versão

**Implementação:** O projeto é um repositório Git único. Todo o código-fonte vive
neste repositório e cada deploy é gerado a partir dele.

**Referência:** `.git/`, `package.json`

---

## II. Dependencies — Declare e isole dependências

**Implementação:** Todas as dependências estão declaradas explicitamente no
`package.json`. O comando `npm ci` garante instalação determinística a partir do
`package-lock.json`, sem dependências implícitas do sistema.

**Referência:** `package.json`, `package-lock.json`

---

## III. Config — Armazene configuração no ambiente

**Implementação:** Variáveis de configuração (como `PORT` e `NODE_ENV`) são lidas
de variáveis de ambiente via `process.env`. O módulo `src/config.ts` centraliza o
carregamento e valida que valores obrigatórios estejam presentes. O arquivo
`.env.example` serve como documentação das variáveis esperadas.

**Referência:** `src/config.ts`, `.env.example`

---

## V. Build, Release, Run — Separe estritamente os estágios

**Implementação:** Os estágios estão separados por scripts npm:

| Estágio | Comando | O que faz |
|---------|---------|-----------|
| Build | `npm run build` | Compila TypeScript → JavaScript em `dist/` |
| Release | Configuração de `.env` + artefato `dist/` | Combina build com config |
| Run | `npm start` | Executa `node dist/server.js` |

**Referência:** `package.json` (scripts), `tsconfig.json`

---

## VI. Processes — Execute a aplicação como processos stateless

**Implementação:** O servidor Express não armazena estado em memória entre
requisições. Não há sessões in-memory, cache local ou variáveis globais mutáveis.
Cada requisição ao `/health` é independente e auto-contida.

**Referência:** `src/routes/health.ts`, `src/app.ts`

---

## VII. Port Binding — Exporte serviços via vínculo de porta

**Implementação:** A aplicação cria seu próprio servidor HTTP e se vincula
diretamente à porta definida em `process.env.PORT`. Não depende de um container
web externo (como Apache ou Nginx) para funcionar.

**Referência:** `src/server.ts` (linha `server.listen(config.port, ...)`)

---

## IX. Disposability — Maximize robustez com inicialização rápida e desligamento gracioso

**Implementação:** O servidor captura os sinais `SIGTERM` e `SIGINT`. Ao recebê-los,
para de aceitar novas conexões, aguarda as conexões existentes encerrarem (com
timeout de 10 segundos) e finaliza o processo de forma limpa.

**Referência:** `src/server.ts` (função `gracefulShutdown`)

---

## X. Dev/Prod Parity — Mantenha dev, staging e produção o mais semelhantes possível

**Implementação:** O mesmo código TypeScript é usado em todos os ambientes. As
dependências são idênticas (gerenciadas pelo `package-lock.json`). A única diferença
é a configuração injetada via variáveis de ambiente. O `.env.example` documenta
todas as variáveis necessárias para rodar em qualquer ambiente.

**Referência:** `.env.example`, `package-lock.json`, `src/config.ts`

---

## XI. Logs — Trate logs como event streams

**Implementação:** A aplicação escreve todos os logs em `stdout` e `stderr` usando
`console.log` e `console.error`. Não gerencia arquivos de log nem rotação — essa
responsabilidade é do ambiente de execução (systemd, Docker, etc.).

**Referência:** `src/app.ts` (middleware de logging), `src/server.ts` (logs de lifecycle)

---

## Fatores não implementados

| # | Fator | Motivo |
|---|-------|--------|
| IV | Backing Services | Não há serviços externos (DB, cache) neste scaffolding |
| VIII | Concurrency | Escalabilidade horizontal via PM2/cluster não foi incluída |
| XII | Admin Processes | Não há tarefas administrativas neste escopo |
