import api from "./api"

export const cardService = {
    getCard: async (id: string) => {
        const { data } = await api.get<Blob>(`/cards/${id}`, {
            responseType: "blob",
        });
        return data
    },
    print: async (list: string[]) => {
        const payload = {
            "ids": list
        }

        const { data } = await api.post<Blob>(`/cards/print`, payload, {
            responseType: "blob",
        });
        
        return data
    }
}