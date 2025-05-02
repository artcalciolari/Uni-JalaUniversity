# Simulador IOT com Python

## Pré-Requisitos

- Python: versão 3.x
- Biblioteca Paho-MQTT
  - pip install paho-mqtt

## Broker MQTT

O broker MQTT atua como o intermediário central, responsável por receber mensagens dos publicadores e distribuí-las aos assinantes corretos com base nos tópicos.
Neste projeto decidimos utilizar um broker público hospedado na nuvem, o HiveMQ.

- Vantagens: Configuração rápida (apenas requer o endereço do broker), útil para testar conectividade real pela internet.
- Desvantagens: Pode introduzir latência, levanta preocupações de privacidade (os dados trafegam pela internet pública), pode ter limites de uso ou instabilidade.

## Definindo o Namespace de Tópicos MQTT

Uma estrutura de tópicos bem definida é crucial para a organização e o roteamento eficiente das mensagens no sistema MQTT. Uma hierarquia lógica facilita a filtragem de mensagens e a compreensão do fluxo de dados.
Com base nos requisitos da simulação, a seguinte estrutura de tópicos é proposta:

| Tópico                         | Propósito/Descrição                                    | Publicador Típico      | Assinante(s) Típico(s)                         | Exemplo de Formato de Mensagem (JSON)                                                      |
| ------------------------------ | ------------------------------------------------------ | ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `acesso/sensor`                | Informa um evento de leitura de sensor (entrada/saída) | Simulador de Sensor    | Serviço de Autorização, Serviço de Permanência | `{"user_id": "user1", "sensor_id": "sensor_entrada", "timestamp": "..."}`                  |
| `acesso/atuador/comando`       | Envia um comando para controlar a porta                | Serviço de Autorização | Simulador de Atuador                           | `"ABRIR"` ou `"FECHAR"` (String simples)                                                   |
| `acesso/atuador/estado`        | (Opcional) Informa o estado atual da porta             | Simulador de Atuador   | (Qualquer monitor)                             | `"ABERTA"` ou `"FECHADA"` (String simples)                                                 |
| `acesso/permanencia/relatorio` | Publica o relatório de permanência acumulado           | Serviço de Permanência | (Interface de usuário/monitor)                 | `[{"user_id": "...", "entrada": "...", "saida": "...", "duracao": "..."},...]`             |
| `acesso/log/acesso`            | (Opcional) Registra tentativas de acesso e resultados  | Serviço de Autorização | (Sistema de log/monitor)                       | `{"user_id": "...", "sensor_id": "...", "timestamp": "...", "status": "permitido/negado"}` |

## Representando Sensores

Na simulação, os sensores são representados por identificadores lógicos únicos. Definiremos dois identificadores:

- 'sensor_entrada'
- 'sensor_saida'

Em um sistema real, esses identificadores lógicos corresponderiam a dispositivos físicos distintos, potencialmente conectados a diferentes pinos GPIO de um microcontrolador ou até mesmo a microcontroladores separados comunicando-se com o broker MQTT.

## Simulando Eventos de Usuário

Para simular as leituras, precisamos de exemplos de identificadores de usuário, e uma forma de gerar eventos.

- ID's de usuário: Definiremos listas de IDs para teste:

```python
authorized_users = ["user1", "user2", "admin"]
unauthorized_users = ["userX", "guest"]
```

- Função de simulação: Uma função será criada para gerar os dados de um evento de leitura.

```python
import datetime
import json

def generate_sensor_event_payload(user_id, sensor_id):
    """Gera o dicionário de dados para um evento de sensor."""
    timestamp = datetime.datetime.now().isoformat()
    payload = {
        "user_id": user_id,
        "sensor_id": sensor_id,
        "timestamp": timestamp
    }
    return payload
```

- Esta função captura o ID do usuário, o ID do sensor e o timestamp atual, organizando-os em um dicionário Python.

## Serialização de Dados

A comunicação entre diferentes componentes (potencialmente escritos em linguagens diferentes ou rodando em plataformas distintas) exige um formato de dados padronizado. O JSON (JavaScript Object Notation) é uma escolha excelente para isso.

- Estrutura Padrão:

```JSON
{"user_id": "...", "sensor_id": "...", "timestamp": "..."}
```

- Serialização: O dicionário Pyhton gerado pela `generate_sensor_event_payload` será convertido em uma string JSON usando a biblioteca json da linguagem.

```python
payload_dict = generate_sensor_event_payload("user1", "sensor_entrada")
json_payload = json.dumps(payload_dict)
print(f"Payload JSON: {json_payload}")
```

## Publicando no MQTT

A lógica de publicação será encapsulada em uma função que utiliza o cliente paho-mqtt conectado.

```python
def publish_sensor_data(client, user_id, sensor_id):
    """Gera e publica dados de um evento de sensor via MQTT."""

    payload_dict = generate_sensor_event_payload(user_id, sensor_id)
    json_payload = json.dumps(payload_dict)

    # Publica a mensagem no tópico do sensor
    # QoS 1: Garante que a mensagem seja entregue pelo menos uma vez.
    # É uma escolha razoável para eventos de acesso, onde a perda é indesejável.
    result = client.publish(SENSOR_TOPIC, payload=json_payload, qos=1)
    result.wait_for_publish() # Aguarda a confirmação da publicação (opcional, bom para depuração)

    if result.rc == mqtt.MQTT_ERR_SUCCESS:
        print(f"Mensagem publicada com sucesso: {json_payload} no tópico {SENSOR_TOPIC}")
    else:
        print(f"Falha ao publicar mensagem no tópico {SENSOR_TOPIC}: {result.rc}")
```

## Simulação do Atuador da Porta

Este componente simula o comportamento físico da porta automática (abrir/fechar) em resposta aos comandos recebidos.

### Representando o Estado da Porta

Uma variável simples ou um atributo de classe pode ser usado para manter o estado atual da porta simulada.

```python
# Variável global ou atributo de classe
door_state = "FECHADA" # Estados possíveis: "FECHADA", "ABERTA"
```

### Simulando Ações do Atuador

Funções serão criadas para simular as ações de abrir e fechar a porta. Na simulação, essas ações consistem principalmente em atualizar a variável de estado e imprimir mensagens no console para visualização.

```python
def open_door(client):
    """Simula a abertura da porta e publica o estado."""
    global DOOR_STATE
    if DOOR_STATE == "FECHADA":
        DOOR_STATE = "ABERTA"
        print(">>> [Actuator] Command received: ABRIR. Door opened.")
        publish_door_state(client)
        # Inicia um timer para fechar a porta automaticamente após 5 segundos
        timer = threading.Timer(5.0, close_door, args=[client])
        timer.daemon = True # Permite que o programa saia mesmo se o timer estiver ativo
        timer.start()
    else:
        print(">>> [Actuator] Command received: ABRIR. Door was already open.")


def close_door(client):
    """Simula o fechamento da porta e publica o estado."""
    global DOOR_STATE
    if DOOR_STATE == "ABERTA":
        DOOR_STATE = "FECHADA"
        print(">>> [Actuator] Closing the door (automatically or by command). Door CLOSED.")
        publish_door_state(client)
    else:
        print(">>> [Actuator] Command received: FECHAR. Door was already closed.")
```

### Gerenciando Usuários Autorizados

A simulação utiliza um conjunto (set) Python em memória (authorized_users) para armazenar os IDs dos usuários permitidos. Usar um conjunto oferece busca (O(1) em média) mais eficiente do que uma lista (O(n)) à medida que o número de usuários cresce. Para um sistema mais flexível, esta lista poderia ser carregada de um arquivo de configuração (JSON, YAML, CSV) no início da execução do serviço.

### Processamento de Mensagens

Script: [auth_client](auth_client.py)

A função `on_message` é o coração do assinante. Ela decodifica o payload da mensagem (que chega como bytes), tenta desserializar a string JSON para um dicionário Python usando `json.loads()`, e extrai os campos necessários (`user_id`, `sensor_id`, `timestamp`). É crucial incluir tratamento de erros (try-except) para lidar com mensagens malformadas ou JSON inválido, evitando que o serviço falhe.

### Implementando a Lógica de Autorização

A função `process_access_request` implementa a lógica central:

1. Verifica se o `user_id` extraído está presente no conjunto `authorized_users`.
2. Se o evento for do `sensor_entrada`:

- Se autorizado, permite o acesso, imprime uma mensagem confirmatória e publica o comando `"ABRIR"` no tópico `acesso/atuador/comando`. O atuador (`door_actuator.py`) receberá este comando e simulará a abertura (incluindo o fechamento automático).
- Se não autorizado, nega o acesso, imprime uma mensagem e **não** publica o comando `"ABRIR"`. Opcionalmente, poderia publicar `"FECHAR"` para garantir que a porta esteja fechada, mas geralmente não é necessário se o estado padrão for fechado.

1. Se o evento for do `sensor_saida`: Conforme a especificação, a saída é assumida como sempre permitida. A função registra o evento e publica o comando `"ABRIR"` no tópico `access/actuator/command`.
2. (Opcional) Publica um registro detalhado da tentativa de acesso (incluindo o status: `permitido`, `negado`, `saida_registrada`) no tópico `acesso/log/acesso`.
