import { useQueryClient } from "@tanstack/react-query";
import { personService } from "../../services/personService";
import type { IPerson } from "../../interfaces/IPerson";

interface NewModalProps {
    open: boolean;
    onClose: () => void;
    person: IPerson | undefined;
}

const NewModal = ({ open, onClose, person }: NewModalProps) => {
    const queryClient = useQueryClient();

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
                    textAlign: "center",
                }}>
                    <h2>Tem certeza que deseja excluir {person!.nome}?</h2>
                    <button
                        style={{
                            backgroundColor: "#ff8383",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "1rem",
                            marginRight: "1rem",
                        }}
                        onClick={() => {
                            personService.delete(person!.id)
                                .then(() => {
                                    queryClient.invalidateQueries({ queryKey: ['people'] });
                                    onClose();
                                });
                        }}
                    >
                        Sim
                    </button>
                    <button
                        style={{
                            backgroundColor: "#e2e2e2",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    >
                        Não
                    </button>
                </div>
            </div>
        )
    )
}

export default NewModal;