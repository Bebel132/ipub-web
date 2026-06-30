import { type INewPerson, type IPerson } from "../interfaces/IPerson"
import api from "./api"

export const personService = {
    get : async () => {
        return api.get('/pessoas')
            .then(response => response.data)
    },
    getById: async (id: string) => {
        return api.get(`/pessoas/${id}`)
            .then(response => response.data)
    },
    update: async (person: IPerson) => {
        return api.put(`/pessoas/${person.id}`, person)
            .then(response => response.data)
    },
    create: async (person: INewPerson) => {
        return api.post('/pessoas', person)
    },
    delete: async (id: string) => {
        return api.delete(`/pessoas/${id}`)
    },
    getPhoto: async (id: string) => {
        const {data} = await api.get<Blob>(`/pessoas/${id}/foto`, {
        responseType: "blob",
    });
        return data
    },
    setPhoto: async (id: string, photo: File) => {
        const formData = new FormData()
        formData.append('foto', photo)
        return api.post(`/pessoas/${id}/foto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}