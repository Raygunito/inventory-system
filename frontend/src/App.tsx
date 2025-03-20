import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./component/LandingPage";
import ProductsPage from "./component/ProductsPage";
import AccountPage from "./component/AccountPage";

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
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
