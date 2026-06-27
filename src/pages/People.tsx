import { useQuery } from "@tanstack/react-query"
import { personService } from "../services/personService"
import { type IPerson } from "../interfaces/IPerson"
import { useMemo, useState } from "react"
import EditModal from "../modals/people/editModal"
import NewModal from "../modals/people/newModal"
import DeleteModal from "../modals/people/deleteModal"

const People = () => {
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

    const [editOpen, setEditOpen] = useState(false)
    const handleCloseEdit = () => setEditOpen(false)

    const [newOpen, setNewOpen] = useState(false)
    const handleCloseNew = () => setNewOpen(false)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleCloseDelete = () => setDeleteOpen(false)

    return (
        <>
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
                    Novo irmão ➕
                </button>
            </div>
            {
                isLoading ? <p>Carregando...</p> :
                <div style={{ 
                    width: "100%",
                    overflowX: "auto",
                    height: "calc(100vh - 200px)",
                }}>
                    <table>
                        <thead style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            backgroundColor: "#f0f0f0",
                        }}>
                            <tr>
                                <th>Nome</th>
                                <th>Congregação</th>
                                <th>Conjunto</th>
                                <th>Data de Nascimento</th>
                                <th>Idade</th>
                                <th>CPF</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map((person) => (
                            <tr key={person.id}>
                                <td>{person.nome}</td>
                                <td>{person.congregacao}</td>
                                <td>{person.conjunto}</td>
                                <td>{person.data_nascimento}</td>
                                <td>{person.idade} anos</td>
                                <td>{person.cpf}</td>
                                <td style={{ width: "208px" }}>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
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
                                        Editar ✍
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
                                    Excluir ❌
                                    </button>
                                </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default People