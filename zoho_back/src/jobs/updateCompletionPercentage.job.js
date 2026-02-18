const { getTasks, patchTasks } = require('../services/tasks.service')
const { getAllProjects } = require('../services/projects.service')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function toHours (v) {
  if (typeof v !== 'string') return 0

  const [h = '0', m = '0'] = v.split(':')

  return Number(h) + Number(m) / 60
}

async function updateCompletionPercentage () {
  console.log('JOB START')

  try {
    const projects = await getAllProjects()
    console.log(`Proyectos encontrados: ${projects.length}`)

    let cont = 0

    for (const project of projects) {
      const projectId = project.id
      console.log(`Proyecto ${projectId}`)

      const tasks = await getTasks(projectId)
      console.log(`Tareas: ${tasks.tasks.length}`)

      await sleep(2000)

      for (const task of tasks.tasks) {
        const actual = toHours(task?.budget_info?.hourly_budget_info?.actual_hours)
        const fore = toHours(task?.budget_info?.hourly_budget_info?.forecasted_hours)

        if (fore <= 0) continue

        const pct = Math.min(99, Math.round((actual / fore) * 100))

        if (Number(task?.completion_percentage) === pct) continue
        if (task.status.name === 'Closed') continue

        console.log(`PATCH task ${task.id} -> ${pct}%`)

        try {
          await patchTasks(projectId, task.id, { completion_percentage: pct })
        } catch {
          continue
        }

        cont++
        if (cont % 10 === 0) await sleep(300000)
      }
    }

    console.log('JOB DONE')
  } catch (error) {
    console.error('JOB ERROR', error.response?.data || error.message)
  }
}

module.exports = updateCompletionPercentage
