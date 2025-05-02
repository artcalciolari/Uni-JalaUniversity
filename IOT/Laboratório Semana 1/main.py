import paho.mqtt.client as paho
from paho import mqtt
import time
import os
import json
from datetime import datetime, timezone
from dotenv import load_dotenv
import subprocess # Para iniciar outros scripts
import sys # Para obter o executável do python
import signal # Para lidar com o encerramento

# Carregar variáveis de ambiente
load_dotenv()
BROKER_ADDR = os.getenv("MQTT_BROKER_ADDRESS")
BROKER_PORT = int(os.getenv("MQTT_BROKER_PORT"))
BROKER_USER = os.getenv("MQTT_USERNAME")
BROKER_PASS = os.getenv("MQTT_PASSWORD")

# Tópicos MQTT
SENSOR_TOPIC = "access/sensor"
REPORT_TOPIC = "access/permanence/report"
REPORT_REQUEST_TOPIC = "access/permanence/request_report"

# IDs de exemplo para simulação
EXAMPLE_AUTH_USER_ID = "user1"
EXAMPLE_UNAUTH_USER_ID = "user4"  # ID não autorizado para simulação
SENSOR_ENTRADA_ID = "sensor_entrada"
SENSOR_SAIDA_ID = "sensor_saida"

# Caminhos para os scripts dos clientes (ajuste se necessário)
CLIENT_SCRIPT_DIR = os.path.join(os.path.dirname(__file__), "clients")
AUTH_CLIENT_SCRIPT = os.path.join(CLIENT_SCRIPT_DIR, "auth_client.py")
ACTUATOR_SCRIPT = os.path.join(CLIENT_SCRIPT_DIR, "door_actuator.py")
PERMANENCE_SCRIPT = os.path.join(CLIENT_SCRIPT_DIR, "permanence_client.py")

# Armazenar processos iniciados
client_processes = []

# --- Funções para Gerenciar Processos ---

def start_clients():
    """Inicia os scripts dos clientes como processos separados."""

    global client_processes
    scripts_to_start = [AUTH_CLIENT_SCRIPT, ACTUATOR_SCRIPT, PERMANENCE_SCRIPT]
    print("[Main] Starting client services...")
    for script_path in scripts_to_start:
      if os.path.exists(script_path):
          try:
            # Usa sys.executable para garantir que está usando o mesmo interpretador Python
            process = subprocess.Popen([sys.executable, script_path])
            client_processes.append(process)
            print(f"[Main] Started {os.path.basename(script_path)} (PID: {process.pid})")
            time.sleep(1) # Dá um pequeno tempo para o cliente iniciar
          except Exception as e:
            print(f"[Main] Failed to start {os.path.basename(script_path)}: {e}")
      else:
          print(f"[Main] Error: Script not found at {script_path}")

    # Verifica se todos os processos essenciais foram iniciados
    if len(client_processes) < len(scripts_to_start):
      print("[Main] Warning: Not all client services could be started.")
      # Você pode decidir encerrar aqui se algum for crítico
      stop_clients()
      exit()

def stop_clients(signum=None, frame=None):
    """Para os processos dos clientes."""

    print("\n[Main] Stopping client services...")

    for process in client_processes:
        try:
          # Tenta terminar graciosamente primeiro
          if process.poll() is None: # Verifica se o processo ainda está rodando
            process.terminate()
            print(f"[Main] Terminated process {process.pid}")
        except Exception as e:
          print(f"[Main] Error stopping process {process.pid}: {e}")

    client_processes.clear()
    # Se chamado por um sinal (como Ctrl+C), sai do programa principal
    if signum is not None:
      print("[Main] Exiting main simulation.")
      sys.exit(0)


# --- Funções Auxiliares MQTT (para main.py) ---

def on_connect(client, userdata, flags, reason_code, properties):
    """Callback de conexão."""

    if reason_code == 0:
      print("[Main] Connected to MQTT Broker.")
      client.subscribe(REPORT_TOPIC, qos=1)
    else:
      print(f"[Main] Failed to connect: {reason_code}")

def on_message(client, userdata, msg):
    """Callback para receber mensagens (ex: relatório)."""

    if msg.topic == REPORT_TOPIC:
      print("\n--- Permanence Report Received ---")
      try:
        report_data = json.loads(msg.payload.decode("utf-8"))
        if isinstance(report_data, list) and report_data:
          for entry in report_data:
            print(f"  User: {entry.get('user_id', 'N/A')}, "
            f"Entry: {entry.get('entrada', 'N/A')}, "
            f"Exit: {entry.get('saida', 'N/A')}, "
            f"Duration: {entry.get('duracao', 'N/A')}s")
        elif isinstance(report_data, list) and not report_data:
          print("[Main] Report is empty.")
        else:
          print(f"  Raw report data: {msg.payload.decode('utf-8')}")
      except json.JSONDecodeError:
        print(f"[Main] Error decoding report data: {msg.payload.decode('utf-8')}")
      print("----------------------------------")
    else:
      print(f"[Main] Received unexpected message on topic {msg.topic}")

def on_subscribe(client, userdata, mid, reason_codes, properties):
    """Callback de inscrição."""

    if not reason_codes[0].is_failure:
      print(f"[Main] Subscribed successfully to {REPORT_TOPIC}")
    else:
      print(f"[Main] Failed to subscribe to {REPORT_TOPIC}: {reason_codes[0]}")

def create_mqtt_client():
    """Cria e configura o cliente MQTT para o main.py."""

    client = paho.Client(paho.CallbackAPIVersion.VERSION2, client_id="main-simulator-client", protocol=paho.MQTTv5)
    client.on_connect = on_connect
    client.on_message = on_message
    client.on_subscribe = on_subscribe
    client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
    client.username_pw_set(BROKER_USER, BROKER_PASS)

    try:
      client.connect(BROKER_ADDR, BROKER_PORT)
      client.loop_start() # Usa loop em background para não bloquear o menu
      return client
    except Exception as e:
      print(f"[Main] Error connecting MQTT client: {e}")
      return None

# --- Funções de Simulação ---

def generate_sensor_event_payload(user_id, sensor_id):
    """Gera o payload JSON para um evento de sensor."""

    timestamp = datetime.now(timezone.utc).isoformat()
    return json.dumps({
        "user_id": user_id,
        "sensor_id": sensor_id,
        "timestamp": timestamp
    })

def simulate_event(client, user_id, sensor_id):
    """Publica um evento de sensor simulado."""

    if not client or not client.is_connected():
      print("[Main] MQTT client not connected. Cannot simulate event.")
      return
    
    payload = generate_sensor_event_payload(user_id, sensor_id)
    result = client.publish(SENSOR_TOPIC, payload=payload, qos=1)
    # result.wait_for_publish() # Bloqueante, usar com cuidado

    if result.rc == paho.MQTT_ERR_SUCCESS:
      print(f"[Main] Published sensor event: {payload} to {SENSOR_TOPIC}")
    else:
      print(f"[Main] Failed to publish sensor event: {mqtt.error_string(result.rc)}")

def request_permanence_report(client):
    """Publica uma mensagem para solicitar o relatório."""

    if not client or not client.is_connected():
      print("[Main] MQTT client not connected. Cannot request report.")
      return
    
    # Publica uma mensagem simples no tópico de solicitação
    result = client.publish(REPORT_REQUEST_TOPIC, payload="GET", qos=1)

    if result.rc == paho.MQTT_ERR_SUCCESS:
      print(f"[Main] Published report request to {REPORT_REQUEST_TOPIC}")
    else:
      print(f"[Main] Failed to publish report request: {mqtt.error_string(result.rc)}")

# --- Menu e Loop Principal ---

def display_menu():
    """Exibe as opções do menu."""
    print("\n--- Simulation Menu ---")
    print("1. Simulate Entry (Authorized Example)")
    print("2. Simulate Exit (Authorized Example)")
    print("3. Simulate Entry (Unauthorized Example)")
    print("4. Display Permanence Report")
    print("5. End Simulation")
    print("-------------------------")

def run_simulation_menu(client):
    """Executa o loop principal do menu interativo."""

    while True:
      display_menu()
      choice = input("Enter your choice: ")
      wait_time = 1 # Tempo de espera padrão

      if choice == '1':
        print(f"\nSimulating Authorized Entry (using ID: {EXAMPLE_AUTH_USER_ID})...")
        # A lógica de autorização real está no auth_client.py
        simulate_event(client, EXAMPLE_AUTH_USER_ID, SENSOR_ENTRADA_ID)
        # Espera tempo suficiente para a porta abrir e fechar (5s timer + 1s buffer)
        wait_time = 6
      elif choice == '2':
        print(f"\nSimulating Authorized Exit (using ID: {EXAMPLE_AUTH_USER_ID})...")
        # A lógica de permanência/saída está no permanence_client.py
        # A lógica de autorização (que abre a porta na saída) está no auth_client.py
        simulate_event(client, EXAMPLE_AUTH_USER_ID, SENSOR_SAIDA_ID)
        # Espera tempo suficiente para a porta abrir e fechar (5s timer + 1s buffer)
        wait_time = 6
      elif choice == '3':
        print(f"\nSimulating Unauthorized Entry (using ID: {EXAMPLE_UNAUTH_USER_ID})...")
        # A lógica de autorização real está no auth_client.py (não deve abrir a porta)
        simulate_event(client, EXAMPLE_UNAUTH_USER_ID, SENSOR_ENTRADA_ID)
        wait_time = 1 # Espera curta, pois a porta não deve abrir
      elif choice == '4':
        print("\nRequesting Permanence Report...")
        request_permanence_report(client)
        # Aguarda mais tempo para a resposta chegar via on_message
        wait_time = 3
      elif choice == '5':
        print("\nEnding Simulation...")
        break # Sai do loop while
      else:
        print("\nInvalid choice. Please try again.")
        wait_time = 1 # Espera curta para entrada inválida

      time.sleep(wait_time) # Pausa antes de mostrar o menu novamente

# --- Execução Principal ---

if __name__ == "__main__":
  # Registrar manipulador para Ctrl+C e outros sinais de término
  signal.signal(signal.SIGINT, stop_clients)
  signal.signal(signal.SIGTERM, stop_clients)

  start_clients() # Inicia os outros scripts

  # Verifica se algum cliente essencial falhou ao iniciar antes de continuar
  if not client_processes:
      print("[Main] No client services were started. Exiting.")
      sys.exit(1)
  # Adicione verificações mais específicas se necessário

  mqtt_client = create_mqtt_client() # Cria o cliente MQTT para este script

  if mqtt_client:
    # Espera um pouco para garantir a conexão MQTT antes de mostrar o menu
    time.sleep(2)
    if mqtt_client.is_connected():
      run_simulation_menu(mqtt_client) # Executa o menu
    else:
      print("[Main] Failed to establish MQTT connection for main simulator. Exiting.")
  else:
    print("[Main] Failed to create MQTT client for main simulator. Exiting.")

  # Limpeza ao sair do loop do menu (opção 5)
  stop_clients()
  if mqtt_client and mqtt_client.is_connected():
    mqtt_client.loop_stop()
    mqtt_client.disconnect()
    print("[Main] Main MQTT client disconnected.")
  print("[Main] Simulation finished.")