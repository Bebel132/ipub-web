import { useNavigate } from "react-router";
import siteMap from "../routes/siteMap";
import { authService } from "../services/authService";
import formatCpf from "../utils/formatCPF";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../components/Loading";

const Login = () => {
    const [load, setLoad] = useState(false);
    const [firstAccess, setFirstAccess] = useState(false);
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();
    
    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);

        const formData = new FormData(e.currentTarget);
        const parsedCpf = cpf.replace(/\D/g, '');
        const password = formData.get("password") as string;

        await authService.login(parsedCpf, password)
            .then(() => {
                authService.me().then(res => {
                    if (res.is_admin) {
                        navigate(siteMap.admin.main, { replace: true });
                    } else {
                        navigate(siteMap.member.profile, { replace: true });
                    }
                })
            })
            .catch(error => {
                
                if(error.response.status === 403) {
                    setFirstAccess(true);
                    toast("Primeiro acesso, por favor defina sua senha.");
                } else {
                    toast.error(error.response.data.msg);
                }
            });

        setLoad(false);
    }

    const handleSubmitFirstAccess = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);

        const formData = new FormData(e.currentTarget);
        const parsedCpf = cpf.replace(/\D/g, '');
        const password = formData.get("password") as string;

        await authService.firstAcess(parsedCpf, password)
            .then(() => {
                toast.success("Senha alterada com sucesso! Faça login novamente.");
                setFirstAccess(false);
            })
            .catch(error => {
                toast.error(error.response.data.msg);
            });

        setLoad(false);
    }
    
    return (
        <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0"
            }}
        >
            { load && 
                <Loader />
            }
            {
                firstAccess ? (
                    <form 
                        onSubmit={handleSubmitFirstAccess}
                        key={"firstAccessForm"}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "2rem",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <label htmlFor="cpf">Cpf</label>
                        <input 
                            id="cpf" 
                            name="cpf" 
                            type="text" 
                            required
                            defaultValue={cpf}
                            maxLength={14}
                            style={{ 
                                padding: "0.5rem", 
                                border: "1px solid #ccc", 
                                borderRadius: "4px", 
                                marginBottom: "1.5rem", 
                                marginTop: "0.5rem" 
                            }}
                            onChange={(e) => {
                                setCpf(e.target.value)
                                e.target.value = formatCpf(e.target.value)
                            }}
                        />
                        <label htmlFor="password">Nova Senha</label>
                        <input id="password" defaultValue={""} name="password" type="password" required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "1.5rem", marginTop: "0.5rem" }} />
                        <button style={{ padding: "0.5rem", backgroundColor: "#2f5fff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">
                            Entrar
                        </button>
                    </form>
                ) : (
                    <form 
                        onSubmit={handleSubmitLogin}
                        key={"loginForm"}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "2rem",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <label htmlFor="cpf">Cpf</label>
                        <input 
                            id="cpf" 
                            name="cpf" 
                            type="text" 
                            required
                            defaultValue={cpf}
                            maxLength={14}
                            style={{ 
                                padding: "0.5rem", 
                                border: "1px solid #ccc", 
                                borderRadius: "4px", 
                                marginBottom: "1.5rem", 
                                marginTop: "0.5rem" 
                            }}
                            onChange={(e) => {
                                setCpf(e.target.value)
                                e.target.value = formatCpf(e.target.value)
                            }}
                        />
                        <label htmlFor="password">Senha</label>
                        <input id="password" name="password" type="password" required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: ".5rem", marginTop: "0.5rem" }} />
                        <p 
                            onClick={() => setFirstAccess(true)}
                            style={{
                                color: "#2f5fff",
                                textDecoration: "underline",
                                cursor: "pointer",
                                marginBottom: "1.5rem",
                            }}
                        >
                            não tenho senha / redefinir senha
                        </p>
                        <button style={{ padding: "0.5rem", backgroundColor: "#2f5fff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">
                            Entrar
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default Login