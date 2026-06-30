import { useQuery } from "@tanstack/react-query";
import type { IPerson } from "../../interfaces/IPerson";
import { personService } from "../../services/personService";
import { useMemo } from "react";
import MemberMenu from "../../components/MemberMenu";

const Calendar = () => {
    const { data, isLoading } =
        useQuery<IPerson[]>({
            queryKey: ['people'],
            queryFn: () => personService.get()
    })

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

    const weekdayBirthdays = useMemo(() => {
        if (!data) return [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + 6);

        return data
            .filter((person) => {
                const [, month, day] = person.data_nascimento.split("-").map(Number);

                const birthday = new Date(
                    today.getFullYear(),
                    month - 1,
                    day
                );

                birthday.setHours(0, 0, 0, 0);

                return birthday >= today && birthday <= endOfWeek;
            })
            .sort((a, b) => {
                const [, monthA, dayA] = a.data_nascimento.split("-").map(Number);
                const [, monthB, dayB] = b.data_nascimento.split("-").map(Number);

                const dateA = new Date(today.getFullYear(), monthA - 1, dayA);
                const dateB = new Date(today.getFullYear(), monthB - 1, dayB);

                return dateA.getTime() - dateB.getTime();
            });
    }, [data]);

    const todayBirthdays = useMemo(() => {
        if (!data) return []
        const today = new Date()
        return data
            .filter((person) => {
                const date = new Date(person.data_nascimento)
                return date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
            })
    }, [data])

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            backgroundColor: "#f0f0f0",
            padding: "1rem",
        }}>
            {
                isLoading ? <p>Carregando...</p> :
                <>
                    <MemberMenu />
                    <div style={{ marginBottom: "1rem" }}>
                        <h1>Aniversariantes de hoje</h1>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {todayBirthdays.length > 0 ? (
                                todayBirthdays.map((person) => {
                                    const [_, month, day] = person.data_nascimento.split("-")    
                                    return (
                                        <li style={{ marginBottom: "0.5rem", marginLeft: "1rem" }} key={person.id}>{person.nome} - {day}/{month}</li>
                                    )
                                })
                            ) : (
                                <p>- Nenhum aniversariante hoje.</p>
                            )}
                        </ul>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <h1>Aniversariantes da semana</h1>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            { weekdayBirthdays.length > 0 ? (
                                weekdayBirthdays.map((person) => {
                                    const [_, month, day] = person.data_nascimento.split("-")
                                    return (
                                        <li style={{ marginBottom: "0.5rem", marginLeft: "1rem" }} key={person.id}>{person.nome} - {day}/{month}</li>
                                    )
                                })
                            ) : (
                                <p>- Nenhum aniversariante na semana.</p>
                            )}
                        </ul>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <h1>Aniversariantes do mês</h1>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {monthBirthdays.length > 0 ? (
                                monthBirthdays.map((person) => {
                                    const [_, month, day] = person.data_nascimento.split("-")
                                    return (
                                        <li style={{ marginBottom: "0.5rem", marginLeft: "1rem" }} key={person.id}>{person.nome} - {day}/{month}</li>
                                    )
                                })
                            ) : (
                                <p>- Nenhum aniversariante no mês.</p>
                            )}
                        </ul>
                    </div>
                </>
            }
        </div>
    )
} 

export default Calendar;