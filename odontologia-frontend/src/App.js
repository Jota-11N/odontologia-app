import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PacientesPage from "./pages/PacientesPage";
import OdontologosPage from "./pages/OdontologosPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/pacientes"
          element={
            <PrivateRoute>
              <PacientesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/odontologos"
          element={
            <PrivateRoute>
              <OdontologosPage />
            </PrivateRoute>
          }
        />

        {/* Redirigir todo lo demás al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
