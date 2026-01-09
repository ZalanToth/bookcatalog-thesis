import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/:id" element={<BookDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
