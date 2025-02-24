# Projeto E-commerce (Exemplo)

Este repositório contém um protótipo de aplicação de **E-commerce** baseado em **microserviços** usando **Java (Spring Boot)**. Cada microserviço possui seu próprio subprojeto e está localizado em pastas separadas.

## Estrutura do Projeto

```bash

ecommerce/
├── architect/
│   ├── ARQUITECT.md        (Documentação de arquitetura - C4, distância da sequência principal, etc.)
│   └── ...
├── README.md               # Este arquivo, com instruções do projeto
├── api-gateway/
│   ├── src/
│   │   ├── main/java/com/example/apigateway/ApiGatewayApplication.java
│   │   └── main/resources/application.properties
│   ├── pom.xml
│   └── README.md
├── catalog-service/
│   ├── src/
│   │   ├── main/java/com/example/catalog/CatalogServiceApplication.java
│   │   └── main/resources/application.properties
│   ├── pom.xml
│   └── README.md
├── order-service/
│   ├── src/
│   │   ├── main/java/com/example/order/OrderServiceApplication.java
│   │   └── main/resources/application.properties
│   ├── pom.xml
│   └── README.md
├── payment-service/
│   ├── src/
│   │   ├── main/java/com/example/payment/PaymentServiceApplication.java
│   │   └── main/resources/application.properties
│   ├── pom.xml
│   └── README.md
├── docker/
│   ├── Dockerfile.api-gateway
│   ├── Dockerfile.catalog
│   ├── Dockerfile.order
│   ├── Dockerfile.payment
│   └── docker-compose.yml
└── pom.xml  
```

## Descrição dos Microserviços

### 1. **API Gateway**

- Responsável pelo roteamento e segurança das requisições.
- Utiliza **Spring Cloud Gateway**.

### 2. **Catalog Service**

- Gerencia os produtos, preços e estoque.
- Exemplo de **CRUD** simples.

### 3. **Order Service**

- Responsável pelo gerenciamento de pedidos.
- Integração com os serviços de pagamento e estoque.

### 4. **Payment Service**

- Simula a autorização e captura de pagamentos.
- Pode integrar-se com **Stripe, PayPal, etc.** no futuro.

## Requisitos

- Java 17+
- Maven 3.8+
- Docker (Opcional para execução via Docker Compose)

## Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/ecommerce.git
   cd ecommerce
   ```

2. Compile e execute os serviços manualmente:

   ```bash
   cd api-gateway && mvn clean package && java -jar target/*.jar & cd ..
   cd catalog-service && mvn clean package && java -jar target/*.jar & cd ..
   cd order-service && mvn clean package && java -jar target/*.jar & cd ..
   cd payment-service && mvn clean package && java -jar target/*.jar & cd ..
   ```

3. Ou utilize Docker Compose:

   ```bash
   cd docker
   docker-compose up --build
   ```

4. Teste acessando:
   - `http://localhost:8080/catalog/products`
   - `http://localhost:8080/order/create`

## Organização do Código

Cada serviço segue esta estrutura:

```bash
<service-name>/
├── src/
│   ├── main/java/com/example/<service-name>/
│   │   └── ...
│   └── main/resources/
│       └── application.properties
├── pom.xml
└── README.md
```

## Documentação

A pasta `architect/` contém:

- `ARQUITECT.md`: Explica os **Diagramas C4**, **estilo arquitetônico** e o cálculo da **distância da sequência principal**.
- Diagramas UML e materiais auxiliares.

## Roadmap

- [ ] Implementar CRUD no `catalog-service`.
- [ ] Criar endpoints REST no `order-service`.
- [ ] Simular integração com gateway de pagamento real.
- [ ] Implementar testes automatizados.
- [ ] Configurar monitoramento (Grafana/Prometheus).

---

### Licença

Este projeto é apenas um **exemplo educacional**.
