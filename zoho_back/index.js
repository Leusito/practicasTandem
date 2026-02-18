const express = require('express')
const cors = require('cors')
const cron = require('node-cron')
require('dotenv').config()

const projectsRoutes = require('./src/routes/projects.routes')
const tasksRoutes = require('./src/routes/tasks.routes')
const documentRoutes = require('./src/routes/documents.routes')
const updateCompletionPercentage = require('./src/jobs/updateCompletionPercentage.job')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/zoho/projects', projectsRoutes)
app.use('/zoho', tasksRoutes)

app.use('/zoho/documents', documentRoutes)

cron.schedule('0 2 * * *', async () => {
  await updateCompletionPercentage()
})

// updateCompletionPercentage()

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})
