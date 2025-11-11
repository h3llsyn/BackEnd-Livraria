import { db } from "../config/db.js";

export async function listarAvaliacoes(req, res) {
  try {
    const [rows] = await db.execute(
      `SELECT a.id, a.usuario_id, u.nome AS usuario, a.livro_id, l.titulo AS livro, a.nota, a.comentario
       FROM avaliacoes a
       JOIN usuarios u ON a.usuario_id = u.id
       JOIN livros l ON a.livro_id = l.id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function criarAvaliacao(req, res) {
  try {
    const { usuario_id, livro_id, nota, comentario } = req.body;

    if (!usuario_id || !livro_id || nota === undefined || nota === null)
      return res.status(400).json({ erro: "Preencha os campos obrigatórios" });

    const notaNum = Number(nota);
    if (Number.isNaN(notaNum) || notaNum < 0 || notaNum > 10)
      return res.status(400).json({ erro: "A nota deve ser um número entre 0 e 10" });

    const notaDecimal = Number.parseFloat(notaNum.toFixed(1));

    const [exist] = await db.execute("SELECT id FROM avaliacoes WHERE usuario_id = ? AND livro_id = ?", [usuario_id, livro_id]);
    if (exist.length > 0) return res.status(409).json({ erro: "Usuário já avaliou este livro" });

    const [result] = await db.execute(
      "INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario) VALUES (?, ?, ?, ?)",
      [usuario_id, livro_id, notaDecimal, comentario]
    );

    res.status(201).json({ mensagem: "Avaliação criada com sucesso!", id: result.insertId });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
