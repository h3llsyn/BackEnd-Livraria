import { db } from "../config/db.js";

// Nota: as rotas atuais usam os nomes listarReservas, criarReserva e excluirReserva
// (provavelmente por copy/paste). Este controller opera sobre a tabela `favoritos`.

export async function listarFavoritos(req, res) {
  try {
    const [rows] = await db.execute(
      `SELECT f.id, f.usuario_id, u.nome AS usuario, f.livro_id, l.titulo AS livro, f.data_favoritado
       FROM favoritos f
       JOIN usuarios u ON f.usuario_id = u.id
       JOIN livros l ON f.livro_id = l.id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function criarFavorito(req, res) {
  try {
    const { usuario_id, livro_id } = req.body;
    if (!usuario_id || !livro_id)
      return res.status(400).json({ erro: "Preencha os campos obrigatórios: usuario_id, livro_id" });

    // Evitar duplicatas (mesmo usuário marcando o mesmo livro várias vezes)
    const [exist] = await db.execute(
      "SELECT id FROM favoritos WHERE usuario_id = ? AND livro_id = ?",
      [usuario_id, livro_id]
    );
    if (exist.length > 0) return res.status(409).json({ erro: "Livro já está nos favoritos deste usuário" });

    const [result] = await db.execute(
      "INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)",
      [usuario_id, livro_id]
    );

    res.status(201).json({ mensagem: "Livro favoritado com sucesso"});
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function excluirFavorito(req, res) {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM favoritos WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ erro: "Favorito não encontrado" });
    res.json({ mensagem: "Favorito removido com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
