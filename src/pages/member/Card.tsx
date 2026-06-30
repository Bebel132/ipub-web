import { useQuery } from "@tanstack/react-query"
import MemberMenu from "../../components/MemberMenu"
import { authService } from "../../services/authService"
import { cardService } from "../../services/cardService"

const Card = () => {
    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: () => authService.me()
    });

    const { data: card, isLoading } = useQuery({
        queryKey: ['card'],
        queryFn: async () => {
            const blob = await cardService.getCard(me?.id || "");
            return URL.createObjectURL(blob);
        },
        enabled: !!me?.id
    });

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0"
        }}>
            <MemberMenu />
            <div>
                {isLoading ? (<p>Carregando...</p>
                ) : card ? (
                    <div
                        style={{
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden"
                        }}
                    >
                        <img
                            src={card}
                            alt="Carteirinha"
                            style={{
                                transform: "rotate(90deg)",
                                width: "90vh",
                                height: "auto",
                                maxWidth: "none",
                            }}
                        />
                    </div>
                ) : (
                    <p>Não foi possível carregar a carteirinha. Contate um administrador.</p>
                )}
            </div>
        </div>
    )
}

export default Card