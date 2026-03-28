# Lab 4 — Twelve-Factor App (TypeScript)

API simples em TypeScript/Express que implementa **9 dos 12 fatores** do manifesto
[Twelve-Factor App](https://12factor.net).

## Início rápido

```bash
# Instalar dependências (Fator II)
npm ci

# Copiar template de variáveis de ambiente (Fator III)
cp .env.example .env

# Desenvolvimento com hot-reload
npm run dev

# Build de produção (Fator V)
npm run build
npm start
```

O endpoint de health check estará disponível em `http://localhost:3000/health`.

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia em modo desenvolvimento com hot-reload |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Executa o build compilado |
| `npm run clean` | Remove a pasta `dist/` |

## Documentação

A pasta [`docs/`](./docs) contém a documentação detalhada do projeto:

- **[twelve-factor.md](./docs/twelve-factor.md)** — Mapeamento completo de cada
  fator do Twelve-Factor App implementado, com referências ao código-fonte
  correspondente e justificativa para os fatores não abordados.

## Estrutura do projeto

```
src/
├── config.ts         # Carregamento de variáveis de ambiente (Fator III)
├── app.ts            # Configuração do Express e middlewares (Fator XI)
├── server.ts         # Entry point, port binding e graceful shutdown (Fatores VII, IX)
└── routes/
    └── health.ts     # Endpoint GET /health (Fator VI)
```
