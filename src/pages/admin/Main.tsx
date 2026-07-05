import { useState } from "react"
import People from "./People"
import { authService } from "../../services/authService"
import Calendar from "./Calendar"

type MenuItem = {
  label: string,
  component: React.FC
}

const Main = () => {
    const menuItems: MenuItem[] = [
        {
        "label": "Pessoas",
        "component": People
        },
        {
        "label": "Aniversários",
        "component": Calendar
        }
    ]
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>(menuItems[0])
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
            position: "relative",
        }}>
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "1rem",
            }}>
                <button
                    style={{
                        display: "absolute",
                        top: 10,
                        right: 10,
                    }}
                    onClick={() => {
                        authService.logout()
                        window.location.reload()
                    }}
                >
                    Sair
                </button>
            </div>
            <div style={{
                display: "flex",
            }}>
                {menuItems.map((item, index) => (
                <button key={index} style={{
                    backgroundColor: selectedMenuItem.label === item.label ? "#78ff83" : "#f0f0f0",
                    padding: "0.5rem 1rem",
                    border: "none", 
                    cursor: "pointer",
                }}
                    onClick={() => setSelectedMenuItem(item)}
                >
                    {item.label}
                </button>
                ))}
            </div>
            <h1>{selectedMenuItem.label}</h1>
            <selectedMenuItem.component />
        </div>
    )
}

export default Main