import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import ToDo from "../features/todo/ToDo";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section>
        <Routes>
          <Route path="/">
            <Route index element={<>Index</>} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="todo" element={<ToDo />} />
          </Route>
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
