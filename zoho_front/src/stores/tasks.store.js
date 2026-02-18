import { create } from 'zustand'
import api from '../api/client'

const useTasksStore = create((set) => ({
    tasks: [],
    loadingTasks: false,
    errorTasks: null,

    fetchTasks: async (projectId) => {
        try {
            set({ loadingTasks: true, errorTasks: null })

            const response = await api.get(`/zoho/projects/${projectId}/tasks`)

            set({
                tasks: response.data.tasks,
                loadingTasks: false
            })
        } catch {
            set({
                errorTasks: 'Error al cargar tareas',
                loadingTasks: false
            })
        }
    }
}))

export default useTasksStore