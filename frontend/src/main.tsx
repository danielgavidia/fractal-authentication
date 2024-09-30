import "./index.css";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import RouteHome from "./routes/RouteHome";
import RouteLogin from "./routes/RouteLogin";
import RouteSignup from "./routes/RouteSignup";
import RouteApp from "./routes/RouteApp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <RouteHome /> },
            { path: "/home", element: <RouteHome /> },
            { path: "/login", element: <RouteLogin /> },
            { path: "/signup", element: <RouteSignup /> },
            { path: "/app", element: <RouteApp /> },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <RouterProvider router={router} />
    // </StrictMode>
);
