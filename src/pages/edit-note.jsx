import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";

export default function EditNote() {
    const navigate = useNavigate();
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");

    //! get the id from the URL
    const { id } = useParams();

    const [noteContent, setNoteContent] = useState();

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

        //? Update the note on the server with the help of the note id and also update the date
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