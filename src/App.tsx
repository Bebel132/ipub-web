import { useQuery } from "@tanstack/react-query"
import Main from "./pages/Main"
import { authService } from "./services/authService"
import { useMemo } from "react"
import Login from "./pages/Login"

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => authService.me()
  })

  const me = useMemo(() => {
    if (!data) return null
    return data
  }, [data])

  return (
    isLoading ? <p>Carregando...</p> :
      me ? <Main /> : <Login />
  )
}

export default App
