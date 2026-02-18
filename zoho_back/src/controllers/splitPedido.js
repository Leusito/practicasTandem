function splitIdPedido (idPedido) {
  if (typeof idPedido !== 'string') {
    return { ejercicio: 0, serie: '00', numero: 0 }
  }

  const match = idPedido.trim().match(/^(\d{4})\/(T\d{2})\/(\d+)$/)

  if (!match) {
    return { ejercicio: 0, serie: '00', numero: 0 }
  }

  return {
    ejercicio: match[1],
    serie: match[2],
    numero: match[3]
  }
}

module.exports = { splitIdPedido }
