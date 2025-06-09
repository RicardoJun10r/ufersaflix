import {
    createBrowserRouter
} from "react-router"

import App from "@/App"
import Home from "@/pages/clients/home"
import ErrorPage from "@/pages/error/error-page"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/home',
                element: <Home />
            }
        ]
    }
])