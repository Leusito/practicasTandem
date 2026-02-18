const { splitIdPedido } = require('../controllers/splitPedido')
const { upsertProject } = require('../db/projects.db')
const { getAllProjects } = require('../services/projects.service')

async function syncProjectsToMysql () {
  console.log('SINCRONIZANDO PROYECTOS CON MYSQL')

  const projects = await getAllProjects()
  console.log(`Proyectos recibidos: ${projects.length}`)

  for (const p of projects) {
    const projectId = p.id
    const idPedido = p.id_pedido

    const { ejercicio, serie, numero } = splitIdPedido(idPedido)

    await upsertProject({
      id: projectId,
      ejercicio,
      serie,
      numero
    })
  }

  console.log('SINCRONIZACION COMPLETADA')
}

module.exports = { syncProjectsToMysql }
