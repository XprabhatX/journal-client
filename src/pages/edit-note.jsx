import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditNote() {
    const navigate = useNavigate();
    
    //! get the id from the URL
    const { id } = useParams();

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

        //? Update the note on the server with the help of the note id and also update the date
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