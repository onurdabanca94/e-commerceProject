import { createBrowserRouter } from "react-router";
import App from "../components/App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage />},
            { path: "about", element: <AboutPage />},
            { path: "contact", element: <ContactPage />},
        ]
    },
    // custom path declaration possible for user types.
    // {
    //     path: "/admin",
    //     element: <App />,
    //     children: [
    //         { path: "", element: <HomePage />},
    //         { path: "products", element: <Products />},
    //         { path: "contact", element: <ContactPage />},
    //     ]
    // }
])