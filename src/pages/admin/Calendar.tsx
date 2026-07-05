import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import { useQuery } from "@tanstack/react-query"
import type { IPerson } from "../../interfaces/IPerson"
import { personService } from "../../services/personService"
import { useMemo } from "react"
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

const Calendar = () => {
    const { data, isLoading } =
    useQuery<IPerson[]>({
        queryKey: ['people'],
        queryFn: () => personService.get()
    })

    const birthdays = useMemo(() => {
    if (!data) return []
        return data.map((person) => {
            const [_, month, day] = person.data_nascimento.split("-")
            const date = new Date(new Date().getFullYear(), Number(month) - 1, Number(day))
            return {
                id: person.id,
                title: person.nome,
                date: date.toISOString().split("T")[0]
            }
        })
    }, [data])

    const monthBirthdays = useMemo(() => {
        if (!data) return []
        const currentMonth = new Date().getMonth() + 1
        return data
            .filter((person) => {
                const month = person.data_nascimento.split("-")[1]
                return Number(month) === currentMonth
            })
            .sort((a, b) => {
                const dayA = Number(a.data_nascimento.split("-")[2]);
                const dayB = Number(b.data_nascimento.split("-")[2]);

                return dayA - dayB;
            })
    }, [data])
    
    return (
        <>
            {
                isLoading ? <p>Carregando...</p> :
                <div
                    style={{
                        width: "100%",
                        overflowX: "auto",
                        height: "calc(100vh - 200px)",
                        display: "flex",
                        gap: "1rem",
                    }}
                >
                    <div style={{
                        flex: 1,
                        height: "100%",
                    }}>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            locale={ptBrLocale}
                            events={birthdays}
                            height="100%"
                        />
                    </div>
                    <div style={{
                        width: "300px",
                        overflowY: "auto",
                        gap: "1rem",
                    }}>
                        <h2>Aniversariantes do mês</h2>
                        <ul>
                            {monthBirthdays.map((person) => {
                                const [_, month, day] = person.data_nascimento.split("-");

                                return (
                                    <li key={person.id}>
                                        {person.nome} - {day}/{month}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default Calendar