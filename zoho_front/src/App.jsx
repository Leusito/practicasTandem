import './index.css'
import useProjectsStore from './stores/projects.store'
import useTasksStore from './stores/tasks.store'
import useDocumentStore from './stores/documents.store'
import api from './api/client'
import { useEffect, useState } from 'react'

function App() {

  const { projects, loadingProjects, errorProjects, selectedProjectId, hasFetchProjects, page, perPage, fetchProjects, nextPage, prevPage, selectProject } = useProjectsStore()
  const { tasks, loadingTasks, errorTasks, fetchTasks } = useTasksStore()
  const { datos, loadingDocument, errorDocument, fetchDocument } = useDocumentStore()

  const [isDocOpen, setDocOpen] = useState(false)
  const [docProjectId, setDocProjectId] = useState(null)

  useEffect(() => {
  if (hasFetchProjects) return 
    fetchProjects()
  }, [hasFetchProjects, fetchProjects])

  const handleProjectClick = async (projectId) => {
    selectProject(projectId)
    await fetchTasks(projectId)
  }

  const handleInfoClick = async (id) => {
    setDocProjectId(id)
    setDocOpen(true)
    await fetchDocument(id)
  }

  const closeDocModal = () => {
    setDocOpen(false)
    setDocProjectId(null)
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeDocModal()
    }

    if (isDocOpen) window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isDocOpen])

  const handlePatchTask = async (projectId, task) => {
    const pct = calcPorcentaje(
        task?.budget_info?.hourly_budget_info?.actual_hours, 
        task?.budget_info?.hourly_budget_info?.forecasted_hours
      )

    try {
      await api.patch(`/zoho/projects/${projectId}/tasks/${task.id}`, {
        completion_percentage: pct
      })

      await fetchTasks(projectId)
    } catch (error) {
      console.error(err?.response?.data || err.message)
    }
  }

  const toHours = (v) => {
    if (typeof v !== 'string') return 0

    const [h = '0', m = '0'] = v.split(':')

    return Number(h) + Number(m) / 60
  }

  const calcPorcentaje = (act_h, plan_h) => {
    const act = toHours(act_h)
    const plan = toHours(plan_h)

    if (plan <= 0) return 0

    const pct = (act / plan) * 100

    return Math.min(99, Math.round(pct))
  }

  return (
    <div className="min-h-screen bg-slate-400 text-black p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div>
          <h2 className="text-xl font-bold mb-4">PROYECTOS</h2>

          {loadingProjects && <p>Cargando proyectos...</p>}
          {errorProjects && <p className="text-red-500">{errorProjects}</p>}

          <ul className="space-y-2">
            {projects.map(project => (
              <li key={project.id}>
                <div
                  key={project.id}
                  className={`flex justify-between items-center p-3 rounded-xl bg-slate-600 transition ${selectedProjectId === project.id ? 'ring-4 ring-white': ''}`}
                >
                  <div className='mb-4'>
                    <h2 className='text-l font-bold text-white'>{project.name}</h2>
                    <p className='text-sm text-black'>ID: <span className='text-white'>{project.id}</span></p>
                    <p className='text-sm text-black'>ID PEDIDO: <span className='text-white'>{project.id_pedido}</span></p>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <button
                      onClick={() => handleProjectClick(project.id)}
                      className='rounded p-1 relative bg-slate-500 hover:bg-slate-400 transition'
                    >
                      TAREAS
                    </button>

                    <button 
                      onClick={() => handleInfoClick(project.id)}
                      className='rounded p-1 relative bg-slate-500 hover:bg-slate-400 transition'
                    >
                      DOCUMENTO
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">TAREAS</h2>

          {!selectedProjectId && (
            <p>Selecciona un proyecto para ver sus tareas</p>
          )}

          {loadingTasks && <p>Cargando tareas...</p>}
          {errorTasks && <p className="text-red-500">{errorTasks}</p>}

          {selectedProjectId && !loadingTasks && !errorTasks && (
            <ul className="space-y-2">
              {tasks.map(task => (
                <li key={task.id} className="bg-indigo-500 p-3 rounded">
                  <p className="font-semibold">{task.name}</p>
                  <p className="text-sm text-slate-200">
                    {task.status?.name ?? 'Sin estado'}
                  </p>
                  {/*
                  <button 
                    className='rounded bg-purple-600 p-1 text-white hover:bg-purple-500'
                    onClick={() => handlePatchTask(selectedProjectId, task)}>
                    {task.completion_percentage}% - ACTUALIZAR
                  </button>
                  */}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          {page !== 1 && (
          <button 
            className="rounded bg-emerald-300 px-3 py-1 text-black hover:bg-emerald-200"
            onClick={prevPage}
            disabled={loadingProjects || page === 1}
          >
            ANTERIOR
          </button>
          )}

          <span className="text-sm">Página {page}</span>

          {projects.length === 10 && (
          <button 
            className="rounded bg-emerald-300 px-3 py-1 text-black hover:bg-emerald-200"
            onClick={nextPage}
            disabled={loadingProjects}
          >
            SIGUIENTE
          </button>
          )}
        </div>

      </div>

      {isDocOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeDocModal()
            }
          }}
        >
          <div className='mt-5'>
            {loadingDocument && <p className='text-gray-300'>Cargando documento...</p>}
            {errorDocument && <p className='text-red-400'>{errorDocument}</p>}

            {!loadingDocument && !errorDocument && (
              <div className='rounded-xl bg-slate-900 p-4 text-gray-100 max-h-[60vh] overflow-auto'>
                <pre className='whitespace-pre-wrap overflow-x-auto text-xs'>
                  {JSON.stringify(datos, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
