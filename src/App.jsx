import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home/Home";
import ResultsPage from "./pages/Result/ResultPage";
import Login from "./pages/Login/loginpage";
import Signup from "./pages/signup/Signup";
import First from "./pages/First/First";
import EduChatbot from "./components/EduChatbot";

function App() {
  return (

      <Routes>
        {/* Public Routes */}
        <Route path="/first" element={<First />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protected Results Page */}
        <Route
          path="/results/:topic"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Protected Chatbot Page */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <EduChatbot />
            </ProtectedRoute>
          }
        />
      </Routes>

  );
}

export default App;
