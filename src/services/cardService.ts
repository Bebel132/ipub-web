import api from "./api"

export const cardService = {
    getCard: async (id: string) => {
        const { data } = await api.get<Blob>(`/cards/${id}`, {
            responseType: "blob",
        });
        return data
    }
}