let reservas = [];
let proximoId = 1;

export const obterReservas = (req, res) => {
  console.log("Reservas atuais:", reservas);
  res.status(200).json(reservas);
};

export const criarReserva = (req, res) => {
  const { usuarioId, livroId, dataReserva } = req.body;

  if (!usuarioId || !livroId || !dataReserva) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  const novaReserva = {
    id: proximoId++,
    usuarioId,
    livroId,
    dataReserva,
    status: "pendente",
    dataCriacao: new Date(),
  };

  reservas.push(novaReserva);
  console.log("Reserva criada:", novaReserva);
  res.status(201).json(novaReserva);
};

export const cancelarReserva = (req, res) => {
  const { id } = req.params;
  const indice = reservas.findIndex((r) => r.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ erro: "Reserva não encontrada" });
  }

  const reservaRemovida = reservas.splice(indice, 1);
  
  res.status(200).json({ mensagem: "Reserva cancelada com sucesso" });
};