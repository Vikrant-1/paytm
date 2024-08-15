import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Screens/Signup";
import SignIn from "./Screens/Signin";
import Dashboard from "./Screens/Dashboard";
import SendMoney from "./Screens/Send";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
