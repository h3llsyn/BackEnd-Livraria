import { db } from "../config/db.js"; // corrigido: .js

// listarReservas → retorna todas as reservas cadastradas (com dados do usuário e livro)
// criarReserva → insere uma nova reserva no banco
// excluirReserva → exclui uma reserva pelo ID

export async function listarReservas(req, res){
    try{
        const [rows] = await db.execute(
            `SELECT r.id, r.usuario_id, u.nome AS usuario, r.livro_id, l.titulo AS livro, r.data_reserva
             FROM reservas r
             JOIN usuarios u ON r.usuario_id = u.id
             JOIN livros l ON r.livro_id = l.id`
        );
        res.json(rows);
    } catch(err){
        res.status(500).json({ erro: err.message });
    }
}

export async function criarReserva(req, res){
    try{
        const { usuario_id, livro_id, data_reserva } = req.body;

        if(!usuario_id || !livro_id || !data_reserva)
            return res.status(400).json({ erro: "Preencha os campos obrigatórios" });
        const [result] = await db.execute(
            "INSERT INTO reservas (usuario_id, livro_id, data_reserva) VALUES (?, ?, ?)",
            [usuario_id, livro_id, data_reserva]
        );
        res.status(201).json({ mensagem: "Reserva criada com sucesso!", id: result.insertId });
    } catch(err){
        res.status(500).json({ erro: err.message });
    }
}

export async function excluirReserva(req, res){
    try{
        const { id } = req.params;
        const [result] = await db.execute("DELETE FROM reservas WHERE id = ?", [id]);
        if(result.affectedRows === 0)
            return res.status(404).json({ erro: "Reserva não encontrada" });
        res.json({ mensagem: "Reserva excluída com sucesso!" });
    } catch(err){
        res.status(500).json({ erro: err.message });
    }
}