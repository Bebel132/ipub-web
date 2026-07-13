import { useQueryClient } from "@tanstack/react-query";
import { personService } from "../../services/personService";
import { congregacoes } from "../../constants/personEnums";
import type { INewPerson } from "../../interfaces/IPerson";
import formatCPF from "../../utils/formatCPF";

interface NewModalProps {
    open: boolean;
    onClose: () => void;
}

const NewModal = ({ open, onClose }: NewModalProps) => {
    const queryClient = useQueryClient();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newPerson: INewPerson = {
            nome: formData.get("nome") as string,
            cpf: (formData.get("cpf") as string).replace(/\D/g, ''), // Remove non-digit characters
            congregacao: formData.get("congregacao") as string,
            data_nascimento: formData.get("data_nascimento") as string,
            data_batismo: formData.get("data_batismo") as string,
        };

        personService.create(newPerson)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['people'] });
                onClose();
            });

    }
    return (
        open && (
            <div style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1000,
            }}>
                <div style={{
                    position: "relative",
                    backgroundColor: "#fff",
                    padding: "1rem",
                    paddingTop: "2rem",
                    maxWidth: "550px",
                    width: "100%",
                }}>
                    <h2>Novo irmão</h2>
                    <button 
                        style={{
                            position: "absolute",
                            top: 5,
                            right: 5
                        }}
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                    <form onSubmit={handleSubmit} style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        marginTop: "1rem",
                    }}>
                        <div>
                            <label htmlFor="nome">Nome:</label><br />
                            <input type="text" id="nome" required name="nome" style={{ width: "100%", padding: "0.5rem" }} />
                        </div>
                        <div>
                            <label htmlFor="cpf">CPF:</label><br />
                            <input 
                                type="text" 
                                id="cpf" 
                                name="cpf" 
                                maxLength={14} 
                                required
                                style={{ width: "100%", padding: "0.5rem" }} 
                                onChange={e => {
                                    e.target.value = formatCPF(e.target.value);
                                }} 
                            />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div>
                                <label htmlFor="congregacao">Congregação:</label><br />
                                <select name="congregacao" required style={{ width: "100%", padding: "0.5rem" }}>
                                    <option value="">Selecione uma congregação</option>
                                    {
                                        Object.entries(congregacoes).map(([key, value]) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label htmlFor="data_nascimento">Data de Nascimento:</label><br />
                                    <input type="date" required id="data_nascimento" name="data_nascimento" style={{ width: "100%", padding: "0.5rem" }} />
                                </div>
                                <div>
                                    <label htmlFor="data_batismo">Data de Batismo:</label><br />
                                    <input type="date" id="data_batismo" name="data_batismo" style={{ width: "100%", padding: "0.5rem" }} />
                                </div>
                        </div>
                        <input type="submit" value="Salvar" style={{ width: "300px", padding: "0.5rem", margin: "0 auto"}} />
                    </form>
                </div>
            </div>
        )
    )
}

export default NewModal;