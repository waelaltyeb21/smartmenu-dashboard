import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NoPageFound from "./Pages/NoPageFound";
import Login from "./Pages/Auth/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Create from "./Pages/Create";
import Display from "./Pages/Display";

function App() {
  return (
    <main className="dashboard">
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/" element={<Dashboard />}>
              <Route path="homepage" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="create_dish" element={<Create />} />
              <Route path="display_dishes" element={<Display />} />
            </Route>
          </Route>
          {/* Login */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
