import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<>Index</>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
