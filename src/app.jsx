import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";

import { Toaster } from "react-hot-toast";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
            </Routes>
            <Toaster position="bottom-right" />
        </BrowserRouter>
    );
}

export default App;
