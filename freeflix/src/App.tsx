import { Outlet } from "react-router"
import Layout from "./components/layout"

function App() {

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
