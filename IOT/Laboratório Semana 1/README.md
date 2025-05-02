# Simulador de Controle de Acesso IoT com Python e MQTT

Este projeto simula um sistema de controle de acesso simples usando Python e o protocolo MQTT para comunicação entre diferentes componentes (sensores, atuador de porta, serviços de autorização e permanência).

## 1. Pré-Requisitos

- Python: versão 3.8 ou superior
- Biblioteca Paho-MQTT:

  ```bash
  pip install paho-mqtt python-dotenv
  ```

- Arquivo `.env`: Crie um arquivo chamado `.env` na raiz do projeto com as seguintes variáveis (substitua pelos seus valores):

  ```dotenv
  MQTT_BROKER_ADDRESS=seu_broker_address
  MQTT_BROKER_PORT=8883 # ou a porta correta (geralmente 8883 para TLS)
  MQTT_USERNAME=seu_username
  MQTT_PASSWORD=sua_password
  ```

## 2. Broker MQTT

O broker MQTT atua como o intermediário central. Este projeto foi testado com o broker público HiveMQ Cloud, mas pode ser adaptado para outros brokers.

- **HiveMQ Cloud (Exemplo):**
  - Vantagens: Configuração rápida, teste de conectividade real pela internet.
  - Desvantagens: Latência potencial, privacidade (dados trafegam pela internet), limites de uso.
- **Broker Local (Alternativa):**
  - Vantagens: Baixa latência, maior controle sobre privacidade e segurança.
  - Desvantagens: Requer instalação e configuração (ex: Mosquitto).

## 3. Estrutura do Projeto

```bash
.
├── .env                  # Credenciais e configurações (NÃO versionar)
├── .gitignore            # Arquivos a serem ignorados pelo Git
├── README.md             # Este arquivo
├── main.py               # Script principal para iniciar e interagir com a simulação
└── clients/              # Módulos dos componentes individuais
    ├── auth_client.py    # Serviço de Autorização
    ├── door_actuator.py  # Simulador do Atuador da Porta
    └── permanence_client.py # Serviço de Cálculo de Permanência e Logs
```

## 4. Namespace de Tópicos MQTT

Uma estrutura de tópicos bem definida é crucial. A seguinte estrutura é utilizada:

| Tópico                             | Propósito/Descrição                                      | Publicador Típico      | Assinante(s) Típico(s)                   | Exemplo de Formato de Mensagem (JSON)                                                      |
| ---------------------------------- | -------------------------------------------------------- | ---------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| `access/sensor`                    | Informa evento de leitura de sensor (entrada/saída)      | `main.py` (Simulador)  | `auth_client.py`, `permanence_client.py` | `{"user_id": "user1", "sensor_id": "sensor_entrada", "timestamp": "..."}`                  |
| `access/actuator/command`          | Envia comando para controlar a porta                     | `auth_client.py`       | `door_actuator.py`                       | `"ABRIR"` ou `"FECHAR"` (String simples)                                                   |
| `access/actuator/state`            | Informa o estado atual da porta (opcional)               | `door_actuator.py`     | (Qualquer monitor, `main.py` não usa)    | `"ABERTA"` ou `"FECHADA"` (String simples)                                                 |
| `access/permanence/report`         | Publica o relatório de permanência acumulado             | `permanence_client.py` | `main.py`                                | `[{"user_id": "...", "entrada": "...", "saida": "...", "duracao": "..."},...]`             |
| `access/permanence/request_report` | Solicita a publicação do relatório de permanência        | `main.py`              | `permanence_client.py`                   | (Payload irrelevante, tópico é o gatilho)                                                  |
| `access/permanence/logs`           | Publica a lista de logs do sistema de permanência        | `permanence_client.py` | `main.py`                                | `["[timestamp] log message 1", "[timestamp] log message 2", ...]`                          |
| `access/permanence/request_logs`   | Solicita a publicação dos logs do sistema de permanência | `main.py`              | `permanence_client.py`                   | (Payload irrelevante, tópico é o gatilho)                                                  |
| `access/log/access`                | Registra tentativas de acesso e resultados (opcional)    | `auth_client.py`       | (Sistema de log/monitor externo)         | `{"user_id": "...", "sensor_id": "...", "timestamp": "...", "status": "permitido/negado"}` |

## 5. Componentes da Simulação

### 5.1. `main.py` (Simulador Principal)

- **Responsabilidade:** Iniciar os outros clientes (`auth_client`, `door_actuator`, `permanence_client`) como processos separados, fornecer um menu interativo para simular eventos de sensor, solicitar relatórios e logs, e exibir as respostas recebidas via MQTT.
- **Publica em:** `access/sensor`, `access/permanence/request_report`, `access/permanence/request_logs`.
- **Assina:** `access/permanence/report`, `access/permanence/logs`.

### 5.2. `clients/auth_client.py` (Serviço de Autorização)

- **Responsabilidade:** Receber eventos de `access/sensor`, verificar se o `user_id` está na lista de usuários autorizados (`authorized_users`), e publicar comandos (`ABRIR`/`FECHAR`) em `access/actuator/command`. Também publica logs de acesso em `access/log/access`.
- **Publica em:** `access/actuator/command`, `access/log/access`.
- **Assina:** `access/sensor`.
- **Lógica:**
  - Entrada autorizada: Publica "ABRIR".
  - Entrada não autorizada: Publica "FECHAR" (ou não faz nada se a porta já estiver fechada).
  - Saída (qualquer usuário): Publica "ABRIR".

### 5.3. `clients/door_actuator.py` (Simulador do Atuador da Porta)

- **Responsabilidade:** Simular o comportamento físico da porta. Recebe comandos de `access/actuator/command` e atualiza seu estado interno (`ABERTA`/`FECHADA`). Publica seu estado atual em `access/actuator/state`.
- **Publica em:** `access/actuator/state`.
- **Assina:** `access/actuator/command`.
- **Lógica:**
  - Recebe "ABRIR": Muda estado para "ABERTA", publica estado, inicia timer de 5 segundos para fechar automaticamente.
  - Recebe "FECHAR": Muda estado para "FECHADA", publica estado.
  - Timer expira / Comando "FECHAR" recebido com porta aberta: Chama `close_door`.

### 5.4. `clients/permanence_client.py` (Serviço de Permanência e Logs)

- **Responsabilidade:**
  - Receber eventos de `access/sensor` para usuários autorizados.
  - Rastrear o tempo de entrada (`user_entry_times`).
  - Calcular a duração da permanência quando um evento de saída correspondente é recebido.
  - Armazenar um histórico dos últimos registros de permanência (`permanence_history`).
  - Armazenar um histórico de logs internos do serviço (`system_logs`).
  - Publicar o relatório de permanência em `access/permanence/report` quando solicitado via `access/permanence/request_report`.
  - Publicar os logs do sistema em `access/permanence/logs` quando solicitado via `access/permanence/request_logs`.
- **Publica em:** `access/permanence/report`, `access/permanence/logs`.
- **Assina:** `access/sensor`, `access/permanence/request_report`, `access/permanence/request_logs`.
- **Lógica:**
  - Evento de entrada (autorizado): Armazena `user_id` e `timestamp` em `user_entry_times`.
  - Evento de saída (autorizado, com entrada registrada): Recupera `timestamp` de entrada, calcula duração, armazena registro em `permanence_history`, remove de `user_entry_times`.
  - Solicitação de relatório: Publica `permanence_history` como JSON.
  - Solicitação de logs: Publica `system_logs` como JSON.
  - Todas as operações importantes são logadas internamente em `system_logs` usando `log_message`.

## 6. Executando a Simulação

1. Certifique-se de que os pré-requisitos (Python, Paho-MQTT, python-dotenv) estão instalados.
2. Configure o arquivo `.env` com as credenciais do seu broker MQTT.
3. Execute o script principal:

```bash
python main.py
```

1. O `main.py` iniciará os três scripts clientes em processos separados e exibirá um menu interativo.
2. Use as opções do menu para:
    - Simular eventos de entrada/saída para usuários autorizados e não autorizados.
    - Solicitar o relatório de permanência.
    - Solicitar e exibir os logs internos do serviço de permanência.
    - Encerrar a simulação (isso também tentará parar os processos clientes).

## 7. Serialização de Dados (JSON)

A comunicação entre os componentes utiliza JSON como formato padrão para payloads de mensagens (exceto para comandos simples como "ABRIR"/"FECHAR").

- **Evento de Sensor (`access/sensor`):**

```json
{"user_id": "user1", "sensor_id": "sensor_entrada", "timestamp": "2025-05-02T10:30:00.123456+00:00"}
```

- **Relatório de Permanência (`access/permanence/report`):**

```json
[
    {"user_id": "user1", "entrada": "...", "saida": "...", "duracao": "0:05:12.345678"},
    {"user_id": "user2", "entrada": "...", "saida": "...", "duracao": "0:15:02.111111"}
]
```

- **Logs do Sistema (`access/permanence/logs`):**

```json
[
    "[2025-05-02 10:30:00] [Permanence] Connected to MQTT Broker.",
    "[2025-05-02 10:31:15] [Permanence] User user1 entered at 2025-05-02 10:31:15.123+00:00.",
    "[2025-05-02 10:36:27] [Permanence] User user1 exited at 2025-05-02 10:36:27.468+00:00. Duration: 0:05:12.345000."
]
```

- **Log de Acesso (`access/log/access`):**

```json
  {"user_id": "user1", "sensor_id": "sensor_entrada", "timestamp": "...", "status": "AUTORIZADO"}
```

## 8. Considerações e Limitações

- **Segurança:** Esta é uma simulação focada no fluxo lógico. Um sistema real exigiria:
  - Criptografia TLS para a conexão MQTT.
  - Mecanismos de autenticação/autorização robustos (não apenas uma lista em memória).
  - Armazenamento seguro de credenciais e IDs autorizados.
  - Proteção contra ataques de repetição.
- **Persistência de Dados:** Os históricos (`permanence_history`, `system_logs`) e o estado de quem está dentro (`user_entry_times`) são mantidos em memória nos scripts Python. Se um script for reiniciado, esses dados são perdidos. Um sistema real usaria armazenamento persistente (arquivos, banco de dados).
- **Confiabilidade MQTT:** A simulação usa QoS 1, que garante entrega *pelo menos uma vez*. Isso pode levar a processamento duplicado em cenários de falha/reconexão. A ordem das mensagens também não é garantida entre diferentes publicações. A lógica atual lida com algumas inconsistências (ex: saída sem entrada), mas sistemas robustos precisam de tratamento mais avançado.
- **Escalabilidade:** A lista de usuários autorizados em memória no `auth_client` não escala bem. Sistemas maiores consultariam bancos de dados ou serviços de identidade externos.
