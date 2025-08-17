import { Outlet } from "react-router"

function App(): React.ReactNode {

  return (
    <>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
