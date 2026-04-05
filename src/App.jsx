import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio.jsx";
import AdminPanel from "./pages/admin/AdminPanel.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin_verify" element={<AdminPanel />} />
    </Routes>
  </BrowserRouter>
);

export default App;