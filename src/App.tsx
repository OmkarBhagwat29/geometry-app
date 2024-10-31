import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./core/context-provider";
import Home from "./pages/home";
// import CadViewer from "./components/pages/cad-viewer";
// import Home from "./components/pages/home";
// import Login from "./components/pages/login";
// import Product from "./components/pages/product";

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/cad" element={<CadViewer />} />
            <Route path="/product" element={<Product />} /> */}
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
