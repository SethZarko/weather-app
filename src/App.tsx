import { Outlet } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App(): React.ReactNode {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <main>
        <Outlet/>
      </main>
    </QueryClientProvider>
  
    </>
  )
}

export default App
