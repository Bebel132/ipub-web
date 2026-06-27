import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type IPerson } from "../../interfaces/IPerson";
import { personService } from "../../services/personService";
import { congregacoes, conjuntos } from "../../constants/personEnums";
import formatCPF from "../../utils/formatCPF";
import { useMemo } from "react";

interface EditModalProps {
    person?: IPerson;
    open: boolean;
    onClose: () => void;
}

const EditModal = ({ person, open, onClose }: EditModalProps) => {
    const { data, isLoading } = useQuery({
        queryKey: ['personPhoto', person?.id],
        queryFn: () => personService.getPhoto(person?.id as string),
        enabled: !!person?.id,
    });

    const avatarName = useMemo(() => {
        if (!person?.nome) return "Usuário";

        const names = person.nome.trim().split(/\s+/);

        if (names.length === 1) {
            return names[0];
        }

        return `${names[0]} ${names[1]}`;
    }, [person]);

    const personPhoto = useMemo(() => {
        return data
            ? URL.createObjectURL(data)
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarName)}&size=150&background=random`;
    }, [data]);

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
                onClose();
            })
            .catch(() => {
                alert("Você não tem permissão para editar este usuário.");
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
                    <h2>Editar {person?.nome}</h2>
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
                        {isLoading ? (
                            <p>Carregando foto...</p>
                        ) : (
                            <div style={{margin: "10px auto"}}>
                                <img 
                                    id="personPhoto"
                                    src={personPhoto} 
                                    alt={person?.nome} 
                                    style={{ 
                                        width: "150px", 
                                        height: "150px",
                                        borderRadius: "100%",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                                />
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handlePhotoChange} style={{display: "none"}}/>
                        <div>
                            <label htmlFor="nome">Nome:</label><br />
                            <input type="text" id="nome" name="nome" defaultValue={person?.nome} style={{ width: "100%", padding: "0.5rem" }} />
                        </div>
                        <div>
                            <label htmlFor="cpf">CPF:</label><br />
                            <input 
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
                            <select name="conjunto" style={{ width: "100%", padding: "0.5rem" }}>
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
                            <input type="date" id="data_nascimento" name="data_nascimento" defaultValue={person?.data_nascimento} style={{ width: "100%", padding: "0.5rem" }} />
                        </div>
                        <input type="submit" value="Salvar" style={{ width: "300px", padding: "0.5rem", margin: "0 auto"}} />
                    </form>
                </div>
            </div>
        )
    )
}

export default EditModal;