/* eslint-disable camelcase */
const express = require('express')
const { getProjects, getIdByEjercicioSerieNumero } = require('../services/projects.service')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page, 10) || 1
    const per_page = Number.parseInt(req.query.per_page, 10) || 10

    const projects = await getProjects({ page, per_page })
    return res.json(projects)
  } catch (error) {
    console.error(error.response?.status, error.response?.data || error.message)
    return res.status(500).json({ error: 'Error al obtener proyectos' })
  }
})

router.get('/id', async (req, res) => {
  try {
    const { ejercicio, serie, numero } = req.query

    if (!ejercicio || !serie || !numero) {
      return res.status(400).json({ error: 'Faltan parámetros' })
    }

    const result = await getIdByEjercicioSerieNumero(ejercicio, serie, numero)

    if (!result) {
      return res.status(404).json({ error: 'Proyecto no encontrado' })
    }

    res.json({ id: result.id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener proyecto' })
  }
})

module.exports = router
