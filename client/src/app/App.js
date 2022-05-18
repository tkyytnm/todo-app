import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import ToDo from "../features/todo/ToDo";
import User from "../features/user/User";
import RequireAuth from "../features/auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="todo" replace />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route
              path="todo"
              element={
                <RequireAuth>
                  <ToDo />
                </RequireAuth>
              }
            />
            <Route
              path="user"
              element={
                <RequireAuth>
                  <User />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
