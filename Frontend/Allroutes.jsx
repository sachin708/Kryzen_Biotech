import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import SignUpForm from "./pages/SingupFrom";
import LoginForm from "./pages/LoginForm";
import Product from "./pages/Product";
import PrivateRoute from "./PrivateRoute";

const Allroutes = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/products"
          element={<PrivateRoute element={<Product />} />}
        />
      </Routes>
    </div>
  );
};

export default Allroutes;
