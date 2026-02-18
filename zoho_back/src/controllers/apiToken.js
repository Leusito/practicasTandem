const axios = require('axios')

let cachedToken = null
let expiresAt = 0
let refreshPromise = null

function computeExpiresAt (expirationValue) {
  if (typeof expirationValue === 'string' && expirationValue.trim()) {
    const isoLike = expirationValue.replace(' ', 'T')
    const ts = Date.parse(isoLike)

    if (!Number.isNaN(ts)) {
      return ts - 60_000
    }
  }

  return Date.now() + 3600_000 - 60_000
}

async function refreshToken () {
  const url = 'https://api.tandemsm.dev:8050/Login/login'

  const body = {
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASS
  }

  const response = await axios.post(
    url,
    body,
    {
      headers:
      {
        accept: '*/*',
        'Content-Type': 'application/json'
      },
      timeout: 10_000
    }
  )

  const token = response.data?.token

  if (!token) {
    return response.status(500).json({ error: 'No se pudo obtener token' })
  }

  cachedToken = token
  expiresAt = computeExpiresAt(response.data?.expiration)

  return cachedToken
}

async function getSwaggerToken () {
  if (cachedToken && Date.now() < expiresAt) {
    return cachedToken
  }

  if (!refreshPromise) {
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

module.exports = { getSwaggerToken }
