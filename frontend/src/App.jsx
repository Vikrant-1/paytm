import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import SendMoney from "./pages/Send";
import { useEffect, useState } from "react";
function App() {
  const [isUser, setIsUser] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsUser(!!token);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
