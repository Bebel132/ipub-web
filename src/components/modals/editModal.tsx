import { type IPerson } from "../../interfaces/IPerson";
import EditForm from "../forms/EditForm";

interface EditModalProps {
    person?: IPerson;
    open: boolean;
    onClose: () => void;
}

const EditModal = ({ person, open, onClose }: EditModalProps) => {
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
                    <EditForm person={person} onClose={onClose} />
                </div>
            </div>
        )
    )
}

export default EditModal;