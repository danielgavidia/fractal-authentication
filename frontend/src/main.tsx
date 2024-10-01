import "./index.css";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import RouteHome from "./routes/RouteHome";
import RouteLogin from "./routes/RouteLogin";
import RouteSignup from "./routes/RouteSignup";
import RouteApp from "./routes/RouteApp";
import LayoutLogin from "./routes/LayoutLogIn";
import LayoutLogout from "./routes/LayoutLogOut";
import { AuthProvider } from "./contexts/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { // logout routes
                path: "/", element: <LayoutLogout />, children: [
                    { path: "/", element: <RouteHome /> },
                    { path: "/home", element: <RouteHome /> },
                    { path: "/home/login", element: <RouteLogin /> },
                    { path: "/home/signup", element: <RouteSignup /> },
                ]
            },
            { // login routes
                path: "/app", element: <LayoutLogin />, children: [
                    { path: "/app/home", element: <RouteApp /> }
                ]
            }
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
    // </StrictMode>
);
