const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

// Endpoints par disparar notificações
app.post('/notify', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).send({
      code: 400,
      error: 'Message is required'
    });
  }

  // Emite a notificação para todos os clientes conectados
  io.emit('notification', message);
  console.log('Notificação enviada para clientes conectados.', { message, timestamp: new Date() });

  res.status(200).send({
    status: 'success',
    message: `Notificação enviada: ${message}`
  });
});

// Configuração do Socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
})

server.listen(PORT, () => {
  console.log(`Servidor rodando e escutando na porta ${PORT}`);
  console.log(`Socket.IO está pronto para receber conexões.`);
})