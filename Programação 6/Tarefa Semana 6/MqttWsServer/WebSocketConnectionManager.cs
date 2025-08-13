using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace MqttWsServer
{
    public class WebSocketConnectionManager
    {
        private readonly ConcurrentDictionary<string, WebSocket> _sockets = new();
        public event Action<string>? ClientConnected;
        public event Action<string>? ClientDisconnected;

        public string Add(WebSocket socket)
        {
            var id = Guid.NewGuid().ToString("N");
            _sockets[id] = socket;
            ClientConnected?.Invoke(id);
            return id;
        }

        public async Task RemoveAsync(string id, WebSocketCloseStatus closeStatus, string? description)
        {
            if (_sockets.TryRemove(id, out var socket))
            {
                try { await socket.CloseAsync(closeStatus, description, CancellationToken.None); } catch { /* ignore */}
                ClientDisconnected?.Invoke(id);
            }
        }

        public async Task BroadcastAsync(string json, CancellationToken ct = default)
        {
            var bytes = Encoding.UTF8.GetBytes(json);
            var seg = new ArraySegment<byte>(bytes);

            foreach (var (id, socket) in _sockets)
            {
                if (socket.State == WebSocketState.Open)
                {
                    try { await socket.SendAsync(seg, WebSocketMessageType.Text, true, ct); }
                    catch { await RemoveAsync(id, WebSocketCloseStatus.InternalServerError, "Error sending message"); }
                }
                else
                {
                    await RemoveAsync(id, WebSocketCloseStatus.NormalClosure, "Socket not open");
                }
            }
        }

        public int Count => _sockets.Count;
    }
}
