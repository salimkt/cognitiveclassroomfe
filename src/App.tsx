import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./pages/auth/layout";
import HomePage from "./pages/main";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import InstructorPage from "./pages/main/instructor";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./lib/guards/ProtectedRoute";
import MainLayout from "./pages/main/layout";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, // Protect all routes within this element
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/instructor",
            element: <InstructorPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
