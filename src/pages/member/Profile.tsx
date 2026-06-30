import { useNavigate } from "react-router";
import { authService } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";
import siteMap from "../../routes/siteMap";
import EditForm from "../../components/forms/EditForm";
import MemberMenu from "../../components/MemberMenu";
import { Toaster } from "react-hot-toast";

const Profile = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: () => authService.me().catch(() => navigate(siteMap.member.login, { replace: true }))
    })

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0"
        }}>
            {isLoading ? (<p>carregando...</p>) : data && (
                <>
                    <Toaster position="top-center" />
                    <MemberMenu />
                    <div>
                        <h1>Perfil</h1>
                        <EditForm person={data} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Profile;