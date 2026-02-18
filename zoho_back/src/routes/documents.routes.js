const express = require('express')
const { getDocument } = require('../services/documents.service')

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Se necesita id de proyecto' })
    }

    const document = await getDocument(id)

    if (!document) {
      return res.status(404).json({ error: 'No se encontro la id' })
    }

    return res.json(document)
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtner documento' })
  }
})

module.exports = router
