import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function EditNote() {
    const navigate = useNavigate();
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");

    //! get the id from the URL
    const { id } = useParams();
    console.log(id)

    const [noteContent, setNoteContent] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/journal/read/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data.journal;
                setTitle(data.title);
                setNoteContent(data.content);
                setTags(data.tags.join(", "));
            } catch (error) {
                console.error("Error fetching journal:", error);
            }
        };

        fetchJournal();

    }, []);

    const handleSubmit = async () => {
        console.log(noteContent);
    
        const allTags = tags.split(",").map((tag) => tag.trim());
    
        try {
            const token = localStorage.getItem("token");
    
            const response = await axios.put(`http://localhost:8080/journal/update`, {
                journalId: id,
                title: title,
                content: noteContent,
                tags: allTags,
                date: new Date()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                console.log("Note updated successfully");
                navigate("/");
            }
        } catch (error) {
            console.error("Error updating note:", error);
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