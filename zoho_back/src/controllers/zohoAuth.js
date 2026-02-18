const axios = require('axios')

let cachedToken = null
let expiresAt = 0
let refreshPromise = null

async function refreshToken () {
  const response = await axios.post(
    'https://accounts.zoho.eu/oauth/v2/token',
    null,
    {
      params:
        {
          refresh_token: process.env.ZOHO_REFRESH_TOKEN,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          grant_type: 'refresh_token',
          scope: 'ZohoProjects.portals.READ ZohoProjects.tasks.READ ZohoProjects.projects.READ ZohoProjects.tasks.UPDATE'
        }
    }
  )

  const token = response.data?.access_token
  if (!token) throw new Error('No se recibio accessToken desde Zoho')

  const expiresInSec = Number(response.data?.expires_in ?? 600)

  cachedToken = token

  expiresAt = Date.now() + expiresInSec * 1000 - 60_000

  return cachedToken
}

async function getAccessToken () {
  if (cachedToken && Date.now() < expiresAt) return cachedToken

  if (!refreshPromise) {
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

module.exports = { getAccessToken }
