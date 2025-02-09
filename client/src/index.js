import { io } from "socket.io-client";
import express from "express";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT || 3000;
const SERVER_URL = "http://localhost:5000";

const app = express();
app.use(cors());
app.use(express.json());

const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("✅ Conectado ao servidor!");
});

socket.on("disconnect", () => {
  console.log("❌ Desconectado do servidor");
});

app.get('/change-master-volume/:direction', (req, res) => {
  if (!req.params.direction) {
      res.status(400).json({ message: 'Direção não informada!' });
  }

  socket.emit("change_master_volume", { change_direction: req.params.direction, timestamp: Date.now() });

  res.status(200).json({message: "Volume alterado com sucesso!"});
});

app.get('/move-mouse/:direction', (req, res) => {
  if (!req.params.direction) {
      res.status(400).json({ message: 'Direção não informada!' });
  }

  if (!req.params.direction.includes('center')) {
    res.status(400).json({ message: 'Direção inválida!' });
  }

  socket.emit("move_mouse", { direction: req.params.direction, timestamp: Date.now() });

  res.status(200).json({message: "Mouse movido com sucesso!"});
});
  
app.listen(PORT, () => {
    console.log(`Client is running on port ${PORT}`)
});