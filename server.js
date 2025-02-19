require('dotenv').config();
const express = require('express');
const { connectDB } = require('./Config/database'); // Importar a conexão com o banco
const asteroidsRoutes = require('./routes/asteroidsRoutes'); // Importar as rotas

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Usar as rotas
app.use('/api/asteroids', asteroidsRoutes);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor da API NASA NeoWs está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
