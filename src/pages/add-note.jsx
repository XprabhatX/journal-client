import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";

export default function AddNote() {
    const navigate = useNavigate();
    const [noteContent, setNoteContent] = useState();
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        //? Fetch note from the server
        //TODO setTags(data.tags.map(tag => tag.name).join(", "))
        //TODO setTitle(data.title)
    }, []);

    const handleSubmit = () => {
        console.log(noteContent);

        const allTags = tags.split(",").map((tag) => tag.trim());
    };

    return (
        <main className="min-h-screen p-5 bg-white rounded-xl flex flex-col gap-8">
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <ReactQuill
                theme="snow"
                value={noteContent}
                onChange={setNoteContent}
                className="w-full"
            />
            <Input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags"
            />
            <div className="flex flex-row w-full justify-between">
                <Button
                    onClick={() => navigate("/")}
                    className=""
                    variant="destructive"
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} className="">
                    Submit
                </Button>
            </div>
        </main>
    );
}