import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";

import { Toaster } from "react-hot-toast";
import AddNote from "./pages/add-note";
import EditNote from "./pages/edit-note";
import EditForm from "./pages/edit-profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="edit" element={<EditForm />} />
            
                    <Route path="/add-new/" element={<AddNote />} />
                    <Route path="/edit-note/:id" element={<EditNote />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
            <Toaster position="bottom-right" />
        </BrowserRouter>
    );
}

export default App;
