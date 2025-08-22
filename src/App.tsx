import { Outlet } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App(): React.ReactNode {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <main>
        <Outlet />
      </main>
      <footer>
        <small>
          test footer
        </small>
      </footer>
    </QueryClientProvider>
  
    </>
  )
}

export default App
