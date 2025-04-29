import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDetailsPage from "../pages/catalog/ProductDetails";
import ErrorPage from "../pages/ErrorPage";
import ServerError from "../components/errors/ServerError";
import NotFound from "../components/errors/NotFound";
import ShoppingCartPage from "../pages/cart/ShoppingCartPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage />},
            { path: "about", element: <AboutPage />},
            { path: "contact", element: <ContactPage />},
            { path: "catalog", element: <CatalogPage />},
            { path: "catalog/:id", element: <ProductDetailsPage />},
            { path: "cart", element: <ShoppingCartPage/>},
            { path: "error", element: <ErrorPage />},
            { path: "server-error", element: <ServerError />},
            { path: "not-found", element: <NotFound />},
            { path: "*", element: <Navigate to="/not-found"/>}
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