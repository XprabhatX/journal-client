import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios"; // Assuming axios is installed

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

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prevValue) => !prevValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                email,
                password,
            });

            if (response.data.message === "success") {
                // Set token in localStorage
                localStorage.setItem("token", response.data.token);

                // Redirect to home page or any desired page
                window.location.href = "/";
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error logging in. Please try again.");
        }
    };

    return (
        <main className="flex flex-col justify-center items-center cursor-default min-h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl select-none">
                        Login
                    </CardTitle>
                    <CardDescription className="select-none">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="select-none">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {showPassword ? (
                                        <EyeOff
                                            className="absolute right-2 top-2 font-thin cursor-pointer"
                                            onClick={handleShowPassword}
                                        />
                                    ) : (
                                        <Eye
                                            className="absolute right-2 top-2 font-thin cursor-pointer"
                                            onClick={handleShowPassword}
                                        />
                                    )}
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
