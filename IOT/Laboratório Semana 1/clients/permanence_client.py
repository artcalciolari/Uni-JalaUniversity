import paho.mqtt.client as paho
from paho import mqtt
import json
import datetime
import os
from dotenv import load_dotenv
from collections import deque

load_dotenv()

BROKER_ADDR = os.getenv("MQTT_BROKER_ADDRESS")
BROKER_PORT = int(os.getenv("MQTT_BROKER_PORT"))
BROKER_USER = os.getenv("MQTT_USERNAME")
BROKER_PASS = os.getenv("MQTT_PASSWORD")
SENSOR_TOPIC = "access/sensor"
REPORT_TOPIC = "access/permanence/report"
REPORT_REQUEST_TOPIC = "access/permanence/request_report" # Novo tópico para solicitar o relatório
MAX_REPORT_HISTORY = 10

authorized_users = {"user1", "user2", "user3"}  # Lista de usuários autorizados

# Dicionário para rastrear usuários dentro e seus horários de entrada
user_entry_times = {}

permanence_history = deque(maxlen=MAX_REPORT_HISTORY)  # Mantém o histórico de permanência

def parse_timestamp(ts_string):
  """Converte uma string ISO format para objeto datetime."""

  try:
      return datetime.datetime.fromisoformat(ts_string)
  except (ValueError, TypeError):
      print(f"[Permanence] Invalid timestamp format: {ts_string}")
      return None

def on_connect(client, userdata, flags, reason_code, properties):
  """Callback chamado quando o cliente conecta ao broker."""

  if reason_code == 0:
      print("[Permanence] Connected to MQTT Broker.")
      client.subscribe(SENSOR_TOPIC, qos=1)
      print(f"[Permanence] Subscribed to topic: {SENSOR_TOPIC}")
      client.subscribe(REPORT_REQUEST_TOPIC, qos=1)  # Inscreve-se no tópico de solicitação de relatório
      print(f"[Permanence] Subscribed to topic: {REPORT_REQUEST_TOPIC}")
  else:
      print(f"[Permanence] Connection failed with reason code: {reason_code}")

def process_permanence_event(user_id, sensor_id, timestamp_str):
  """Processa eventos de sensor para calcular o tempo de permanência."""

  timestamp = parse_timestamp(timestamp_str)
  if not timestamp:
      return
  
  if user_id not in authorized_users:
    print(f"[Permanence] Ignoring event for unauthorized user: {user_id}")
    return
  
  if sensor_id == "sensor_entrada":
    if user_id not in user_entry_times:
      user_entry_times[user_id] = timestamp
      print(f"[Permanence] User {user_id} entered at {timestamp}.")
    else:
      print(f"[Permanence] WARNING: Duplicate entry event for {user_id} at {timestamp}.")
  
  elif sensor_id == "sensor_saida":
     if user_id in user_entry_times:
      entry_timestamp = user_entry_times.pop(user_id) # remove e obtém a entrada
      exit_timestamp = timestamp
      duration = (exit_timestamp - entry_timestamp)

      permanence_record = {
        "user_id": user_id,
        "entrada": entry_timestamp.isoformat(),
        "saida": exit_timestamp.isoformat(),
        "duracao": str(duration)
      }
      permanence_history.append(permanence_record)
      print(f"[Permanence] User {user_id} exited at {exit_timestamp}. Duration: {duration}.")
     else:
      print(f"[Permanence] WARNING: Exit event for {user_id} without entry record.")

def on_message(client, userdata, msg):
  """Callback de recebimento de mensagem para o servidor de permanência."""

  if msg.topic == REPORT_REQUEST_TOPIC:
    print("[Permanence] Report request received.")
    publish_permanence_report(client)  # Publica o relatório quando solicitado
    return

  try:
    data = json.loads(msg.payload.decode('utf-8'))
    user_id = data.get("user_id")
    sensor_id = data.get("sensor_id")
    timestamp_str = data.get("timestamp")

    if user_id and sensor_id and timestamp_str:
      process_permanence_event(user_id, sensor_id, timestamp_str)
      
  except json.JSONDecodeError:
    pass
  except Exception as e:
    print(f"[Permanence] Error processing message: {e}")

def get_permanence_report():
  """Retorna os dados do relatório como uma lista de dicionários."""
  return list(permanence_history)

def display_permanence_history():
  """Exibe o histórico de permanência no console."""

  print("\n--- Relatório de Permanência ---")
  report_data = get_permanence_report()

  if not report_data:
    print("Nenhum registro de permanência encontrado.")
  else:
    for record in report_data:
        print(f"Usuário: {record['user_id']}, Entrada: {record['entrada']}, Saída: {record['saida']}, Duração: {record['duracao']}")
  print("------------------------------\n")

def publish_permanence_report(client):
  """Publica o relatório de permanência no tópico MQTT."""

  report_data = get_permanence_report()
  json_report = json.dumps(report_data)
  result = client.publish(REPORT_TOPIC, json_report, qos=1, retain=True)
  if result.rc == paho.MQTT_ERR_SUCCESS:
    print(f"[Permanence] Report published successfully to {REPORT_TOPIC}.")
  else:
    print(f"[Permanence] Failed to publish report: {result.rc}")
    print(f"[Permanence] Report data: {json_report}")

permanence_client = paho.Client(paho.CallbackAPIVersion.VERSION2, client_id="permanence-client", userdata=None, protocol=paho.MQTTv5)

permanence_client.on_connect = on_connect
permanence_client.on_message = on_message

permanence_client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
permanence_client.username_pw_set(BROKER_USER, BROKER_PASS)

# Conecta ao broker
try:
  permanence_client.connect(BROKER_ADDR, BROKER_PORT)
except Exception as e:
  print(f"[Permanence] Error connecting to broker: {e}")
  exit()

print("[Permanence] Starting client...")
permanence_client.loop_forever()

print("[Permanence] Client stopped.")