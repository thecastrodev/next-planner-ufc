import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import Login from "../../pages/Login/Login";
>>>>>>> 896f213711f0449fefb95a8e478e4f46bbc82921

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path={"/"} />
=======
        <Route path={"/"} element={<Login />} />
>>>>>>> 896f213711f0449fefb95a8e478e4f46bbc82921
      </Routes>
    </BrowserRouter>
  );
}
