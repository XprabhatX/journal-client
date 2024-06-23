import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditNote() {
    const navigate = useNavigate();
    const [noteContent, setNoteContent] = useState()
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // navigate('/login');
        }

    }, [navigate])

    useEffect(() => {
        //? Fetch note from the server
    }, [])

    const handleSubmit = () => {
        console.log(noteContent)
    }

    return (
        <main className="min-h-screen p-5 bg-white rounded-xl flex flex-col gap-8">
            <ReactQuill theme="snow" value={noteContent} onChange={setNoteContent} className="w-full" />
            <div className="flex flex-row w-full justify-between">
                <Button onClick={() => navigate('/')} className="" variant="destructive">Cancel</Button>
                <Button onClick={handleSubmit} className="" >Submit</Button>
            </div>
        </main>
    )
}