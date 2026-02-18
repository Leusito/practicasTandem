const axios = require('axios')
const { getAccessToken } = require('../controllers/zohoAuth')

async function getTasks (projectId) {
  const accessToken = await getAccessToken()

  const response = await axios.get(
    `https://projectsapi.zoho.eu/api/v3/portal/${encodeURIComponent(process.env.ZOHO_PORTAL_ID)}/projects/${encodeURIComponent(projectId)}/tasks`,
    {
      headers:
        {
          Authorization: `Bearer ${accessToken}`
        }
    }
  )

  return response.data
}

async function patchTasks (projectId, taskId, updates) {
  const accessToken = await getAccessToken()

  const response = await axios.patch(
    `https://projectsapi.zoho.eu/api/v3/portal/${encodeURIComponent(process.env.ZOHO_PORTAL_ID)}/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}`,
    updates,
    {
      headers:
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data
}

module.exports = { getTasks, patchTasks }
