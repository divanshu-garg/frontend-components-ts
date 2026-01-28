import "./App.css";
import MainLayout from "./components/MainLayout";
import Team from "./components/pages/Team";
import LoginPage from "./components/pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./components/pages/PublicRoute";
import Error404 from "./components/pages/Error404";
import Table from "./components/pages/Table.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Team />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
    {
    path: "/data",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Table />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: (
    <Error404 />),
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
