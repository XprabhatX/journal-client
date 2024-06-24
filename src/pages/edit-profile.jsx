import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put("http://localhost:8080/user/update", {
                name,
                email,
                password,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                navigate("/")
            }
        } catch (error) {
            toast.error("Error signing up. Please try again.");
        }
    };

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Edit Profile</CardTitle>
                    <CardDescription>
                        Enter your information to update your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="Name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Max Robinson"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Update your account
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default EditForm;
