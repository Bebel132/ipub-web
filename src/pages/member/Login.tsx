import { useNavigate } from "react-router";
import siteMap from "../../routes/siteMap";
import { authService } from "../../services/authService";
import formatCpf from "../../utils/formatCPF";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);

        const formData = new FormData(e.currentTarget);
        const cpf = (formData.get("cpf") as string).replace(/\D/g, ''); // Remove non-digit characters
        const password = formData.get("password") as string;

        authService.login(cpf, password)
            .then(() => {
                navigate(siteMap.member.profile, { replace: true });
            })
            .catch(error => {
                toast.error("Login failed: " + error.message);
                toast.dismiss();
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
                <div style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    width: "100%", 
                    height: "100%", 
                    backgroundColor: "rgba(0, 0, 0, 0.5)", 
                    display: "flex", 
                    justifyContent: 
                    "center", 
                    alignItems: 
                    "center", 
                    zIndex: 9999 
                }}>
                    <div style={{ color: "#fff", fontSize: "1.5rem" }}>Entrando na sua conta...</div>
                </div> 
            }
            <form 
                onSubmit={handleSubmit}
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
                    maxLength={14}
                    style={{ 
                        padding: "0.5rem", 
                        border: "1px solid #ccc", 
                        borderRadius: "4px", 
                        marginBottom: "1.5rem", 
                        marginTop: "0.5rem" 
                    }}
                    onChange={(e) => e.target.value = formatCpf(e.target.value)}
                />
                <label htmlFor="password">Senha</label>
                <input id="password" name="password" type="password" required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "1.5rem", marginTop: "0.5rem" }} />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login