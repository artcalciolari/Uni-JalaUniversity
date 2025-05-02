import paho.mqtt.client as paho
from paho import mqtt
import json
import os
from dotenv import load_dotenv

load_dotenv()

BROKER_ADDR = os.getenv("MQTT_BROKER_ADDRESS")
BROKER_PORT = int(os.getenv("MQTT_BROKER_PORT"))
BROKER_USER = os.getenv("MQTT_USERNAME")
BROKER_PASS = os.getenv("MQTT_PASSWORD")
SENSOR_TOPIC = "access/sensor"
COMMAND_TOPIC = "access/actuator/command"
LOG_TOPIC = "access/log/access"

authorized_users = {"user1", "user2", "user3"}  # Lista de usuários autorizados

def on_connect(client, userdata, flags, reason_code, properties):
  """Callback chamado quando o cliente conecta ao broker."""

  if reason_code == 0:
    print("[Authorization] Connected to MQTT Broker.")
    client.subscribe(SENSOR_TOPIC, qos=1)  # Inscreve-se no tópico do sensor
    print(f"[Authorization] Subscribed to topic: {SENSOR_TOPIC}")
  else:
    print(f"[Authorization] Connection failed with reason code: {reason_code}")

def proccess_access_request(client, user_id, sensor_id, timestamp):
  """Processa uma solicitação de acesso baseada na leitura do sensor."""

  is_authorized = user_id in authorized_users  # Verifica se o usuário está autorizado
  status = "NEGADO"

  if sensor_id == "sensor_entrada":
    if is_authorized:
      print(f"[Authorization] Access granted to {user_id} at {timestamp}.")
      client.publish(COMMAND_TOPIC, "ABRIR", qos=1)  # Comando para abrir a porta
      status = "AUTORIZADO"
    else:
      print(f"[Authorization] Access denied to {user_id} at {timestamp}.")
      client.publish(COMMAND_TOPIC, "FECHAR", qos=1)
      status = "NEGADO"
  elif sensor_id == "sensor_saida":
    # Assume que a saída é sempre permitida para simplificar
    print(f"[Autorização] Saída registrada para {user_id} em {timestamp} via {sensor_id}.")
    # Comandar abertura da porta para saída
    client.publish(COMMAND_TOPIC, "ABRIR", qos=1)
    status = "saida_registrada" # Status diferente para log
  
  # Publica o log de acesso
  log_payload = json.dumps({
    "user_id": user_id,
    "sensor_id": sensor_id,
    "timestamp": timestamp,
    "status": status
  })
  client.publish(LOG_TOPIC, log_payload, qos=0)  # Publica o log de acesso
  print(f"[Authorization] Log published: {log_payload}")

def on_message(client, userdata, msg):
  """Callback de recebimento de mensagem para o servidor de autorização."""
  
  print(f"[Authorization] Message received on topic: {msg.topic}")
  try:
    data = json.loads(msg.payload.decode('utf-8'))
    user_id = data.get("user_id")
    sensor_id = data.get("sensor_id")
    timestamp = data.get("timestamp")

    if user_id and sensor_id and timestamp:
      proccess_access_request(client, user_id, sensor_id, timestamp)
    else:
      print("[Authorization] Invalid message format. Missing required fields.")
  except json.JSONDecodeError:
    print("[Authorization] Error: JSON received is not valid.")
  except Exception as e:
    print(f"[Authorization] Error processing message: {e}")

auth_client = paho.Client(paho.CallbackAPIVersion.VERSION2, client_id="auth-simulator-client", userdata=None, protocol=paho.MQTTv5)

auth_client.on_connect = on_connect
auth_client.on_message = on_message

auth_client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
auth_client.username_pw_set(BROKER_USER, BROKER_PASS)

# Conecta ao broker
try:
  auth_client.connect(BROKER_ADDR, BROKER_PORT)
except Exception as e:
  print(f"[Authorization] Error connecting to broker: {e}")
  exit() # Sai se não conseguir conectar


print("[Authorization] Starting authorization client...")
auth_client.loop_forever()

print("[Authorization] Authorization client stopped.")