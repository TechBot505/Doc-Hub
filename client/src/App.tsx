import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateVault from "./pages/PrivateVault";
import PublicVault from "./pages/PublicVault";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/private" element={<PrivateVault />} />
          <Route path="/public" element={<PublicVault />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
