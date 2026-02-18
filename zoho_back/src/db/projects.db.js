const { pool } = require('./mysql')

async function upsertProject ({ id, ejercicio, serie, numero }) {
  const sql = `
        INSERT INTO proyecto (id, ejercicio, serie, numero)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          id = VALUES(id),
          ejercicio = VALUES(ejercicio),
          serie = VALUES(serie),
          numero = VALUES(numero)
    `

  const connect = await pool.getConnection()

  try {
    await connect.execute(sql, [id, ejercicio, serie, numero])
  } finally {
    connect.release()
  }
}

module.exports = { upsertProject }
