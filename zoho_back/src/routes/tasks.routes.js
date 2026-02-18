const express = require('express')
const { getTasks, patchTasks } = require('../services/tasks.service')

const router = express.Router()

router.get('/projects/:projectId/tasks', async (req, res) => {
  try {
    const { projectId } = req.params

    if (!projectId) return res.status(400).json({ error: 'Es necesario un ProjectId' })

    const tasks = await getTasks(projectId)
    return res.json(tasks)
  } catch (error) {
    return res.status(error?.response?.status || 500).json({
      error: 'Error al obtener tareas',
      details: error?.response?.data || error.message
    })
  }
})

router.patch('/projects/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const { projectId, taskId } = req.params
    // eslint-disable-next-line camelcase
    const { completion_percentage } = req.body

    // eslint-disable-next-line camelcase
    if (completion_percentage === undefined) {
      return res.status(400).json({ message: 'Falta completion_percentage en el body' })
    }

    let value = Number(completion_percentage)

    if (!Number.isFinite(value) || value < 0) {
      value = 0
    }

    if (value >= 100) {
      value = 99
    }

    const updates = { completion_percentage: value }

    const data = await patchTasks(projectId, taskId, updates)
    return res.json(data)
  } catch (error) {
    console.log('ZOHO STATUS:', error?.response?.status)
    console.log('ZOHO DATA:', error?.response?.data)

    return res.status(error?.response?.status || 500).json({
      error: 'Error al modificar completion_percentage',
      details: error?.response?.data || error.message
    })
  }
})

module.exports = router
