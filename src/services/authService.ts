import api from "./api"

export const authService = {
    login: async (cpf: string, password: string) => {
        const { data } = await api.post("/auth/login", {
            cpf,
            password,
        });

        localStorage.setItem("access_token", data.access_token);

        return data;
    },
    me: async () => {
        const { data } = await api.get("/auth/me");
        return data;
    },
    logout: () => {
        localStorage.removeItem("access_token");
    },
}