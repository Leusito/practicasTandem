const axios = require('axios')
const { getSwaggerToken } = require('../controllers/apiToken')
const { pool } = require('../db/mysql')

async function getParamsById (id) {
  const [rows] = await pool.execute(
    `SELECT ejercicio, serie, numero
    FROM proyecto
    WHERE id = ?`,
    [id]
  )

  if (!rows[0]) {
    return null
  }

  const { ejercicio, numero, serie } = rows[0]
  return { ejercicio, numero, serie }
}

async function getDocument (id) {
  const token = await getSwaggerToken()
  const { ejercicio, serie, numero } = await getParamsById(id)

  const response = await axios.get(
    `https://api.tandemsm.dev:8050/api/common/documentos/PedidoVenta/${ejercicio}/${numero}`,
    {
      headers:
      {
        Authorization: `Bearer ${token}`
      },
      params:
      {
        serieDocumento: serie,
        generarPdf: false
      }
    }
  )

  return response.data
}

module.exports = { getDocument }
