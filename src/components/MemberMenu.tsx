import { useState } from "react";
import siteMap from "../routes/siteMap";
import { useNavigate } from "react-router";

const MemberMenu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.hash.replace("#", ""));
    
    const menuItems = [
        {label: "Perfil", path: siteMap.member.profile},
        {label: "Carteirinha", path: siteMap.member.memberCard},
        {label: "Calendário", path: siteMap.member.calendar},
    ]

    const handleMenuItemClick = (path: string) => {
        navigate(path);
        setOpen(false);
        setCurrentPath(path);
    }

    return (
        <>
            <button 
                onClick={() => setOpen(!open)}
                style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    zIndex: 1000,
                }}
            >
                {open ? "Fechar Menu" : "Abrir Menu"}
            </button>
            <div
                style={{
                    position: "absolute",
                    width: "260px",
                    height: "100vh",
                    right: "0",
                    top: "0",
                    display: open ? "block" : "none",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "right 0.3s ease-in-out",
                    zIndex: 999,
                }}
            >
                <ul style={{ listStyle: "none", padding: 0, marginTop: "4rem" }}>
                    {menuItems.map((item, index) => (
                        <li>
                            <button
                                key={index}
                                onClick={() => handleMenuItemClick(item.path)}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "2rem 1rem",
                                    textAlign: "left",
                                    backgroundColor: currentPath === item.path ? "#007bff" : "transparent",
                                    color: currentPath === item.path ? "#fff" : "#000",
                                    cursor: "pointer",
                                    border: "none",
                                }}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default MemberMenu