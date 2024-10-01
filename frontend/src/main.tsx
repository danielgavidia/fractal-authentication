import "./index.css";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import Root from "./Root";
import RouteHome from "./routes/RouteHome";
import RouteLogin from "./routes/RouteLogin";
import RouteSignup from "./routes/RouteSignup";
import RouteApp from "./routes/RouteApp";

// Clerk auth
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("clerk key:", CLERK_PUBLISHABLE_KEY);
if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

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
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
    </ClerkProvider>
    // </StrictMode>
);
