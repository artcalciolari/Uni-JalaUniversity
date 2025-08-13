using MqttWsServer;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opt =>
{
    var allowed = builder.Configuration.GetSection("AllowedCors").Get<string[]>() ?? Array.Empty<string>();
    opt.AddDefaultPolicy(p => p.WithOrigins(allowed).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
});

builder.Services.AddSingleton<WebSocketConnectionManager>();
builder.Services.AddSingleton<MqttService>();
builder.Services.AddHostedService<MqttService>(provider => provider.GetRequiredService<MqttService>());

var app = builder.Build();

app.UseCors();
app.UseWebSockets(new WebSocketOptions { KeepAliveInterval = TimeSpan.FromSeconds(20) });

app.MapGet("/", () => Results.Ok("MQTT+WS server running."));

app.MapPost("/api/notify", async (NotifyReq req, MqttService mqtt, WebSocketConnectionManager ws, IConfiguration cfg, CancellationToken ct) =>
{
    var topic = req.Topic ?? cfg["Mqtt:PublishTopic"] ?? "notifications/broadcast";
    var message = req.Text ?? "(empty)";

    await mqtt.PublishAsync(topic, message, ct);

    var evt = JsonSerializer.Serialize(new { type = "http", topic, text = message, ts = DateTimeOffset.UtcNow });
    await ws.BroadcastAsync(evt, ct);

    return Results.Ok(new { ok = true });
});

app.Map("/ws", async (HttpContext ctx, WebSocketConnectionManager ws) =>
{
    if (!ctx.WebSockets.IsWebSocketRequest) { ctx.Response.StatusCode = 400; return; }

    using var socket = await ctx.WebSockets.AcceptWebSocketAsync();
    var id = ws.Add(socket);

    var hello = JsonSerializer.Serialize(new { type = "system", text = $"connected:{id}", clients = ws.Count, ts = DateTimeOffset.UtcNow });
    await ws.BroadcastAsync(hello);

    var buffer = new byte[8 * 1024];
    try
    {
        while (socket.State == WebSocketState.Open)
        {
            var result = await socket.ReceiveAsync(buffer, ctx.RequestAborted);
            if (result.MessageType == WebSocketMessageType.Close) break;

            if (result.MessageType == WebSocketMessageType.Text)
            {
                var text = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var evt = JsonSerializer.Serialize(new { type = "ws-client", text, ts = DateTimeOffset.UtcNow });
                await ws.BroadcastAsync(evt, ctx.RequestAborted);
            }
        }
    }
    finally
    {
        await ws.RemoveAsync(id, WebSocketCloseStatus.NormalClosure, "client left");
        var bye = JsonSerializer.Serialize(new { type = "system", text = $"disconnected:{id}", clients = ws.Count, ts = DateTimeOffset.UtcNow });
        await ws.BroadcastAsync(bye);
    }
});

app.Run();

record NotifyReq(string? Topic, string? Text);