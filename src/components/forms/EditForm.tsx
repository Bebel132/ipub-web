import { useQuery, useQueryClient } from "@tanstack/react-query";
import { personService } from "../../services/personService";
import type { IPerson } from "../../interfaces/IPerson";
import formatCPF from "../../utils/formatCPF";
import { congregacoes, conjuntos } from "../../constants/personEnums";
import toast from "react-hot-toast";

interface EditFormProps {
    person?: IPerson;
    onClose?: () => void;
}

const EditForm = ({ person, onClose }: EditFormProps) => {
    const { data: personPhoto, isLoading } = useQuery({
        queryKey: ["personPhoto", person?.id],
        queryFn: async () => {
            const blob = await personService.getPhoto(person!.id);
            return URL.createObjectURL(blob);
        },
        enabled: !!person?.tem_foto,
    });

    const queryClient = useQueryClient();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const updatedPerson: IPerson = {
            id: person!.id,
            nome: formData.get("nome") as string,
            cpf: (formData.get("cpf") as string).replace(/\D/g, ''), // Remove non-digit characters
            congregacao: formData.get("congregacao") as string,
            conjunto: formData.get("conjunto") as string,
            data_nascimento: formData.get("data_nascimento") as string,
            idade: person!.idade,
            tem_foto: person!.tem_foto
        };

        personService.update(updatedPerson)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['people'] });
                onClose?.();
                toast.success("Usuário atualizado com sucesso!");
            })
            .catch(() => {
                toast.error("Você não tem permissão para editar este usuário.");
            });
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            personService.setPhoto(person!.id, file)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: ['personPhoto', person?.id] });
                });
            const photoElement = document.getElementById("personPhoto") as HTMLImageElement | null;
            if (photoElement) {
                photoElement.src = URL.createObjectURL(file);
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1rem",
            }}>
                {isLoading ? (
                    <p>Carregando foto...</p>
                ) : (
                    <div style={{
                        margin: "10px auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <img 
                            id="personPhoto"
                            src={personPhoto ? personPhoto : `https://ui-avatars.com/api/?name=${encodeURIComponent(person!.nome)}&size=150&background=random`} 
                            alt={person?.nome} 
                            style={{ 
                                width: "150px", 
                                height: "150px",
                                borderRadius: "100%",
                                cursor: "pointer",
                            }}
                            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                        />
                        <p><i>clique na imagem para alterar a foto</i></p>
                    </div>
                )}
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{display: "none"}}/>
                <div>
                    <label htmlFor="nome">Nome:</label><br />
                    <input 
                        key={person?.id} 
                        type="text" 
                        id="nome" 
                        name="nome" 
                        defaultValue={person?.nome} 
                        style={{ width: "100%", padding: "0.5rem" }} 
                    />
                </div>
                <div>
                    <label htmlFor="cpf">CPF:</label><br />
                    <input
                        key={person?.id} 
                        type="text" 
                        id="cpf" 
                        name="cpf" 
                        defaultValue={formatCPF(person?.cpf)} 
                        maxLength={14} 
                        style={{ width: "100%", padding: "0.5rem" }} 
                        onChange={e => {
                            e.target.value = formatCPF(e.target.value);
                        }} 
                    />
                </div>
                <div>
                    <label htmlFor="congregacao">Congregação:</label><br />
                    <select name="congregacao" style={{ width: "100%", padding: "0.5rem" }}>
                        {
                            Object.entries(congregacoes).map(([key, value]) => (
                                <option key={key} value={value} selected={person?.congregacao === value}>{value}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="conjunto">Conjunto:</label><br />
                    <select key={person?.id} name="conjunto" style={{ width: "100%", padding: "0.5rem" }}>
                        {
                            person?.conjunto === null ? <option value="">Selecione um conjunto</option> : null
                        }
                        {
                            Object.entries(conjuntos).map(([key, value]) => (
                                <option key={key} value={value} selected={person?.conjunto === value}>{value}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="data_nascimento">Data de Nascimento:</label><br />
                    <input 
                        key={person?.id} 
                        type="date" 
                        id="data_nascimento" 
                        name="data_nascimento" 
                        defaultValue={person?.data_nascimento} 
                        style={{ width: "100%", padding: "0.5rem" }} 
                    />
                </div>
                <input 
                    key={person?.id} 
                    type="submit" 
                    value="Salvar" 
                    style={{ width: "300px", padding: "0.5rem", margin: "0 auto"}} 
                />
            </form>
        </>
    )
}

export default EditForm;