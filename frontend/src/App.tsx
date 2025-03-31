import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./component/AuthContext";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./component/LandingPage";
import ProductsPage from "./component/ProductsPage";
import AccountPage from "./component/AccountPage";
import DashboardPage from "./component/DashboardPage";

const AppLayout = () => {
  const location = useLocation();
  const showFooter = location.pathname !== "/";

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
