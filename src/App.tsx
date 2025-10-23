import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./pages/auth/layout";
import HomePage from "./pages/main";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import InstructorPage from "./pages/main/instructor";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./lib/guards/ProtectedRoute";
import DashboardLayout from "./pages/main/DashboardLayout";
import ProfilePage from "./pages/main/Profile";
import MyCoursesPage from "./pages/main/MyCourses";
import EditCoursePage from "./pages/main/instructor/EditCourse";
import CreateCoursePage from "./pages/main/instructor/CreateCourse";
import Dashboard from "./pages/main/dashboard";

const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />, // Protect all routes within this element
      children: [
        {
          element: <DashboardLayout />,
          children: [
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/instructor",
              element: <InstructorPage />,
            },
            {
              path: "/instructor/create-course",
              element: <CreateCoursePage />,
            },
            {
              path: "/instructor/edit-course/:id",
              element: <EditCoursePage />,
            },
            {
              path: "/my-courses",
              element: <MyCoursesPage />,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
            },
            {
              path: "/dashboard",
              element: <Dashboard />,
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
  ],
  {
    basename: "/cognitiveclassroomfe/",
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
