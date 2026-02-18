import { create } from 'zustand'
import api from '../api/client'

const useProjectsStore = create((set, get) => ({
    projects: [],
    loadingProjects: false,
    errorProjects: null,
    selectedProjectId: null,
    hasFetchProjects: false,
    page: 1,
    perPage: 10,

    fetchProjects: async (opts = {}) => {
        const page = opts.page ?? get().page
        const perPage = opts.perPage ?? get().perPage

        try {
            set({ loadingProjects: true, errorProjects: null })

            const response = await api.get('/zoho/projects', {
                params: {
                    page,
                    per_page: perPage
                }
            })

            set({
                projects: response.data,
                loadingProjects: false,
                hasFetchProjects: true,
                page,
                perPage
            })
        } catch {
            set({
                errorProjects: "Error al cargar proyectos",
                loadingProjects: false,
                hasFetchProjects: false
            })
        }
    },

    nextPage: async () => {
        const { page, perPage, fetchProjects } = get()
        await fetchProjects({ page: page+1, perPage})
    },

    prevPage: async () => {
        const { page, perPage, fetchProjects } = get()
        await fetchProjects({ page: Math.max(1, page-1), perPage })
    },

    selectProject: (projectId) => {
        set({ selectedProjectId: projectId })
    }
}))

export default useProjectsStore