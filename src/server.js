// ============================
//  Dependências        
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";
import livrosRoutes from "./routes/livros.routes.js";
import avaliacaoRoutes from "./routes/avaliacoes.routes.js"

// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use("/usuarios", usuarioRoutes);
app.use("/livros", livrosRoutes);
app.use("/avaliacoes", avaliacaoRoutes);
// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
