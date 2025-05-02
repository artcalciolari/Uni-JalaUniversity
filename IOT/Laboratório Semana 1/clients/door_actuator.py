import paho.mqtt.client as paho
from paho import mqtt
import time
import threading
import os
from dotenv import load_dotenv

load_dotenv()

BROKER_ADDR = os.getenv("MQTT_BROKER_ADDRESS")
BROKER_PORT = int(os.getenv("MQTT_BROKER_PORT"))
BROKER_USER = os.getenv("MQTT_USERNAME")
BROKER_PASS = os.getenv("MQTT_PASSWORD")

DOOR_STATE = "FECHADA"  # Estado inicial da porta
COMMAND_TOPIC = "access/actuator/command" # Tópico para receber comandos
STATE_TOPIC = "access/actuator/state"   # Tópico para publicar o estado

def publish_door_state(client):
    """Publica o estado atual da porta."""

    global DOOR_STATE
    client.publish(STATE_TOPIC, payload=DOOR_STATE, qos=1, retain=True) # retain=True para que novos assinantes saibam o estado atual
    print(f"[Actuator] Door state: {DOOR_STATE}")

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


def on_connect(client, userdata, flags, reason_code, properties):
    """Callback chamado quando o cliente conecta ao broker."""

    if reason_code == 0:
        print(f"[Actuator] successfully connected to the broker.")
        # Inscreve-se no tópico de comando após conectar
        client.subscribe(COMMAND_TOPIC, qos=1)
        # Publica o estado inicial ao conectar
        publish_door_state(client)
    else:
        print(f"[Actuator] connection failed: {reason_code}")

def on_subscribe(client, userdata, mid, reason_codes, properties):
    """Callback chamado após a inscrição em um tópico."""

    if reason_codes[0].is_failure:
        print(f"[Actuator] Failed to subscribe to topic {COMMAND_TOPIC}: {reason_codes[0]}")
    else:
        print(f"[Actuator] Successfully subscribed to command topic: {COMMAND_TOPIC}")

def on_message(client, userdata, msg):
    """Callback chamado quando uma mensagem é recebida."""

    command = msg.payload.decode("utf-8")
    print(f"[Actuator] Command received on topic {msg.topic}: {command}")

    if msg.topic == COMMAND_TOPIC:
        if command == "ABRIR":
            open_door(client)
        elif command == "FECHAR":
            close_door(client)
        else:
            print(f"[Actuator] Unknown command received: {command}")

def on_publish(client, userdata, mid, reason_code, properties):
    """Callback chamado após a publicação de uma mensagem (opcional para depuração)."""
    pass # Geralmente não precisamos fazer nada aqui para o atuador

print("[Actuator] Starting Door Actuator...")

actuator_client = paho.Client(paho.CallbackAPIVersion.VERSION2, client_id="door-actuator-client", userdata=None, protocol=paho.MQTTv5)

# Define os callbacks
actuator_client.on_connect = on_connect
actuator_client.on_subscribe = on_subscribe
actuator_client.on_message = on_message
actuator_client.on_publish = on_publish

# Configurações TLS e autenticação
actuator_client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
actuator_client.username_pw_set(BROKER_USER, BROKER_PASS)

# Conecta ao broker
try:
    actuator_client.connect(BROKER_ADDR, BROKER_PORT)
except Exception as e:
    print(f"[Actuator] Error connecting the actuator to the broker: {e}")
    exit() # Sai se não conseguir conectar

# Inicia o loop de rede em modo bloqueante.
# O atuador só precisa esperar por comandos.
print("[Actuator] Started and waiting for commands...")
actuator_client.loop_forever()

print("[Actuator] client disconnected.") # Esta linha só será alcançada se loop_forever for interrompido