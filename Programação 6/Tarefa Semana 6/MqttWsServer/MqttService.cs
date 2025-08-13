using MQTTnet;
using MQTTnet.Client;
using System.Text;
using System.Text.Json;

namespace MqttWsServer
{
    public class MqttService : IHostedService
    {
        private readonly IConfiguration _cfg;
        private readonly ILogger<MqttService> _logger;
        private readonly WebSocketConnectionManager _ws;
        private IMqttClient? _mqttClient;
        private MqttClientOptions? _mqttOptions;

        public MqttService(IConfiguration cfg, ILogger<MqttService> logger, WebSocketConnectionManager ws)
        {
            _cfg = cfg; _logger = logger; _ws = ws;
        }

        public async Task StartAsync(CancellationToken ct)
        {
            var host = _cfg["Mqtt:Host"];
            var port = _cfg.GetValue<int>("Mqtt:Port");
            var user = _cfg["Mqtt:Username"];
            var pass = _cfg["Mqtt:Password"];
            var clienIdId = _cfg["Mqtt:ClientId"];
            var subscribeTopic = _cfg["Mqtt:SubscribeTopic"];
            var useTls = _cfg.GetValue<bool>("Mqtt:UseTls");

            var factory = new MqttFactory();
            _mqttClient = factory.CreateMqttClient();

            _mqttClient.ApplicationMessageReceivedAsync += async e =>
            {
                var payload = e.ApplicationMessage?.PayloadSegment.Array is { } arr && arr.Length > 0
                    ? Encoding.UTF8.GetString(e.ApplicationMessage.PayloadSegment)
                    : string.Empty;

                var evt = JsonSerializer.Serialize(new
                {
                    type = "mqtt",
                    topic = e.ApplicationMessage?.Topic,
                    text = payload,
                    ts = DateTimeOffset.UtcNow
                });

                await _ws.BroadcastAsync(evt, ct);
            };

            _mqttClient.DisconnectedAsync += async e =>
            {
                _logger.LogWarning("MQTT disconnected: {Reason}. Reconnecting in 2s...", e.Reason);
                await Task.Delay(TimeSpan.FromSeconds(2), ct);
                try { if (_mqttClient != null && _mqttOptions != null) await _mqttClient.ConnectAsync(_mqttOptions, ct); }
                catch (Exception ex) { _logger.LogError(ex, "Reconnection failed"); }
            };

            var builder = new MqttClientOptionsBuilder()
                .WithClientId(clienIdId)
                .WithTcpServer(host, port);

            if (!string.IsNullOrWhiteSpace(user)) builder = builder.WithCredentials(user, pass);
            if (useTls) builder = builder.WithTlsOptions(_ => { });

            _mqttOptions = builder.Build();

            await _mqttClient.ConnectAsync(_mqttOptions, ct);
            await _mqttClient.SubscribeAsync(subscribeTopic);
            _logger.LogInformation("MQTT client connected to {Host}:{Port} with client ID {ClientId} and subscribed to {Topic}",
                host, port, clienIdId, subscribeTopic);
        }

        public async Task PublishAsync(string topic, string payload, CancellationToken ct = default)
        {
            if (_mqttClient == null) return;
            var msg = new MqttApplicationMessageBuilder()
                .WithTopic(topic)
                .WithPayload(payload)
                .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.AtLeastOnce)
                .Build();

            await _mqttClient.PublishAsync(msg, ct);
        }

        public async Task StopAsync(CancellationToken ct)
        {
            if (_mqttClient != null && _mqttClient.IsConnected)
            {
                try
                {
                    await _mqttClient.DisconnectAsync(cancellationToken: ct);
                    _logger.LogInformation("MQTT client disconnected");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error disconnecting MQTT client");
                }
            }
            else
            {
                _logger.LogWarning("MQTT client was not connected or already disconnected");
            }
        }
    }
}
