import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Notes from "@/components/notes";
import Sidebar from "@/components/sidebar";

export default function Home() {
    const navigate = useNavigate();
    const [token, setToken] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // navigate('/login');
        } else {
            setToken(token);
        }
    }, [token, navigate])
    
    return (
        <main className="relative flex flex-row min-h-screen max:max">
            <Sidebar />

            <section className="flex flex-col justify-start p-8 gap-6 items-start w-full">
                <p className="font-bold text-4xl">My Notes</p>

                <Notes />
            </section>
        </main>
    );
}
