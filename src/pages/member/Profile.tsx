import { authService } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";
import EditForm from "../../components/forms/EditForm";
import MemberMenu from "../../components/MemberMenu";
import Loader from "../../components/Loading";

const Profile = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: () => authService.me()
    })

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            padding: "0 1rem",
        }}>
            {isLoading ? (<Loader />) : data && (
                <>
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