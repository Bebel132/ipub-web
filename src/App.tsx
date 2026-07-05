import { HashRouter } from "react-router"
import AppRoutes from "./routes"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <HashRouter>
      <Toaster position="top-center" />
      <AppRoutes />
    </HashRouter>
  )
}

export default App
