const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor Node funcionando");
});

app.post("/usuarios", (req, res) => {
  const { nombre, correo } = req.body;
  const sql = "INSERT INTO usuarios (nombre, correo) VALUES (?, ?)";

  db.query(sql, [nombre, correo], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Usuario registrado");
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto 3000");
});