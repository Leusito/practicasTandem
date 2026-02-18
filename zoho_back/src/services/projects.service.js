/* eslint-disable camelcase */
const axios = require('axios')
const { getAccessToken } = require('../controllers/zohoAuth')
const { pool } = require('../db/mysql')

async function getProjects ({ page = 1, per_page = 10 } = {}) {
  const accessToken = await getAccessToken()

  const response = await axios.get(
    `https://projectsapi.zoho.eu/api/v3/portal/${encodeURIComponent(process.env.ZOHO_PORTAL_ID)}/projects`,
    {
      headers:
      {
        Authorization: `Bearer ${accessToken}`
      },
      params:
      {
        page,
        per_page
      }
    }
  )

  return response.data
}

async function getAllProjects ({ page = 1, per_page = 100 } = {}) {
  const accessToken = await getAccessToken()

  const allProjects = []

  while (true) {
    const response = await axios.get(
      `https://projectsapi.zoho.eu/api/v3/portal/${encodeURIComponent(process.env.ZOHO_PORTAL_ID)}/projects`,
      {
        headers:
        {
          Authorization: `Bearer ${accessToken}`
        },
        params:
        {
          page,
          per_page
        }
      }
    )

    if (response.data.length === 0) break

    allProjects.push(...response.data)
    page++
  }

  return allProjects
}

async function getIdByEjercicioSerieNumero (ejercicio, serie, numero) {
  const [rows] = await pool.execute(
    `SELECT id
    FROM proyecto
    WHERE ejercicio = ?
    AND serie = ?
    AND numero = ?`,
    [ejercicio, serie, numero]
  )

  return rows[0] || null
}

module.exports = { getAllProjects, getProjects, getIdByEjercicioSerieNumero }
