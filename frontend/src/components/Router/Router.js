import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} />
        <Route path={"/"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
