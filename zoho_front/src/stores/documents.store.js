import { create } from 'zustand'
import api from '../api/client'

const useDocumentStore = create((set, get) => ({
  datos: [],
  loadingDocument: false,
  errorDocument: null,

  fetchDocument: async (id) => {
    try {
      set({ loadingDocument: true })

      const response = await api.get(`/zoho/documents/${id}`)

      set({
        datos: response.data,
        loadingDocument: false
      })
    } catch {
      set({
        errorDocument: 'Error al cargar los datos del proyecto',
        loadingDocument: false
      })
    }
  }
}))

export default useDocumentStore