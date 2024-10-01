import "./index.css";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import RouteHome from "./routes/RouteHome";
import RouteLogin from "./routes/RouteLogin";
import RouteSignup from "./routes/RouteSignup";
import RouteApp from "./routes/RouteApp";
import RouteAppLayout from "./routes/RouteAppLayout";
import { AuthProvider } from "./contexts/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <RouteHome /> },
            { path: "/home", element: <RouteHome /> },
            { path: "/login", element: <RouteLogin /> },
            { path: "/signup", element: <RouteSignup /> },
            {
                path: "/app", element: <RouteAppLayout />, children: [
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
