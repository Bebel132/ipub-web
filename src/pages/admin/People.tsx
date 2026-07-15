import { useQuery } from "@tanstack/react-query"
import { personService } from "../../services/personService"
import { type IPerson } from "../../interfaces/IPerson"
import { useMemo, useState } from "react"
import EditModal from "../../components/modals/editModal"
import NewModal from "../../components/modals/newModal"
import DeleteModal from "../../components/modals/deleteModal"
import { cardService } from "../../services/cardService"
import Loader from "../../components/Loading"
import toast from "react-hot-toast"

const People = () => {
    const [ loading, setLoading ] = useState(false);
    const [search, setSearch] = useState('')

    const { data, isLoading } =
    useQuery<IPerson[]>({
        queryKey: ['people'],
        queryFn: () => personService.get()
    })

    const people = useMemo(() => {
    if (!data) return []
        return data.filter((person) => person.nome.toLowerCase().includes(search.toLowerCase()))
    }, [data, search])

    const [selectedPerson, setSelectedPerson] = useState<IPerson | undefined>()
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const [editOpen, setEditOpen] = useState(false)
    const handleCloseEdit = () => setEditOpen(false)

    const [newOpen, setNewOpen] = useState(false)
    const handleCloseNew = () => setNewOpen(false)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleCloseDelete = () => setDeleteOpen(false)

    const selectId = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
        } else {
            setSelectedIds([...selectedIds, id])
        }
    }

    const selectAll = () => {
        if (selectedIds.length === people.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(people.map((person) => person.id))
        }
    }

    const handlePrint = () => {
        setLoading(true);
        cardService.print(selectedIds)
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "cartoes.pdf";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch((err) => {
                toast.error(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            {loading && <Loader />}
            <EditModal person={selectedPerson} open={editOpen} onClose={handleCloseEdit} />
            <NewModal open={newOpen} onClose={handleCloseNew} />
            <DeleteModal person={selectedPerson} open={deleteOpen} onClose={handleCloseDelete} />
            <div style={{
                display: "flex",
                gap: "0.5rem",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center", 
                marginTop: "1rem"
                }}
            >
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    style={{ maxWidth: "500px", width: "100%", padding: "0.5rem" }}
                />
                <button style={{
                        backgroundColor: "#2f5fff",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        color: "#fff"
                    }}
                    onClick={() => setNewOpen(true)}
                >
                    Novo irmão
                </button>
            </div>
            {
                isLoading ? <p>Carregando...</p> :
                <>
                    {selectedIds.length > 0 && (
                        <button style={{
                            backgroundColor: "#2f5fff",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "0.5rem",
                            color: "#fff",
                            width: "fit-content"
                        }}
                        onClick={handlePrint}
                        >
                            Imprimir
                        </button> 
                    )}
                    <div style={{ 
                        width: "100%",
                        overflowX: "auto",
                        height: selectedIds.length > 0 ? "calc(100vh - 249px)" : "calc(100vh - 201px)",
                    }}>
                        <table>
                            <thead style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                backgroundColor: "#f0f0f0",
                            }}>
                                <tr>
                                    <th><input type="checkbox" onChange={selectAll} /></th>
                                    <th>Nome</th>
                                    <th>Congregação</th>
                                    <th>Data de Nascimento</th>
                                    <th>Idade</th>
                                    <th>CPF</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map((person) => (
                                <tr key={person.id}>
                                    <td style={{ width: "30px", textAlign: "center" }}>
                                        <input type="checkbox" checked={selectedIds.includes(person.id)} onChange={() => selectId(person.id)} />
                                    </td>
                                    <td>{person.nome}</td>
                                    <td>{person.congregacao}</td>
                                    <td>{person.data_nascimento}</td>
                                    <td>{person.idade} anos</td>
                                    <td>{person.cpf}</td>
                                    <td style={{ width: "150px", textAlign: "center" }}>
                                        <div style={{ 
                                            display: "flex", 
                                            gap: "0.5rem",
                                            width: "fit-content",
                                        }}>
                                            <button style={{
                                                backgroundColor: "#78ff83",
                                                padding: "0.5rem 1rem",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                setSelectedPerson(person);
                                                setEditOpen(true);
                                            }}
                                            >
                                                Editar
                                            </button>
                                            <button style={{
                                                    backgroundColor: "#ff8383",
                                                    padding: "0.5rem 1rem",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    setSelectedPerson(person);
                                                    setDeleteOpen(true);
                                                }}
                                            >
                                            Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </>
    )
}

export default People