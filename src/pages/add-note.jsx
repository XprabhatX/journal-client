import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";

export default function AddNote() {
    const navigate = useNavigate();
    const [noteContent, setNoteContent] = useState("");
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        const allTags = tags.split(",").map((tag) => tag.trim());

        try {
            await axios.post("http://localhost:8080/journal/create", {
                title,
                content: noteContent,
                tags: allTags,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Note added successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to add note");
            console.error("Error adding note:", error);
        }
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
