import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import axios from "axios";
import parse from 'html-react-parser';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Edit, Delete } from "lucide-react";

export default function Notes() {
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const [allNotes, setAllNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [filter, setFilter] = useState("all");

    // Fetch notes from the server when the component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get("http://localhost:8080/journal/read", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the request headers
                    },
                });
                const fetchedNotes = response.data.journals.map(note => ({
                    ...note,
                    date: new Date(note.date),
                }));
                setAllNotes(fetchedNotes);
                setFilteredNotes(fetchedNotes);
            } catch (error) {
                toast.error("Failed to fetch notes");
                console.error("Error fetching notes:", error);
            }
        };


        fetchNotes();
    }, []);

    // Update filtered notes based on the filter
    useEffect(() => {
        const currentDate = new Date();
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);

        let newNotes = [];
        if (filter === "This week") {
            newNotes = allNotes.filter(note => note.date >= weekStart && note.date <= weekEnd);
        } else if (filter === "This month") {
            newNotes = allNotes.filter(note => note.date >= monthStart && note.date <= monthEnd);
        } else if (filter === "This day") {
            newNotes = allNotes.filter(note => note.date.getDate() === currentDate.getDate());
        } else {
            newNotes = allNotes;
        }

        setFilteredNotes(newNotes);
    }, [filter, allNotes]);

    const handleFilter = new_filter => {
        if (filter === new_filter) {
            setFilter("all");
        } else {
            setFilter(new_filter);
        }
    };

    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-gray-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-rose-500",
    ];

    const handleDelete = async (_id) => {
        const token = localStorage.getItem("token");
        console.log("token", _id);
        console.log("token", token);
        try {
            await axios.delete(`http://localhost:8080/journal/delete`, {
                journalId: _id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Note delete successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete note");
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div className="w-full">
            {/* Filters */}
            <div className="flex sm:flex-row flex-col justify-between w-full">
                <div className="flex flex-row gap-5">
                    <Button
                        className={cn("hover:underline")}
                        variant={filter === "This day" ? "outline" : "ghost"}
                        onClick={() => handleFilter("This day")}
                    >
                        This day
                    </Button>
                    <Button
                        className={cn("hover:underline")}
                        variant={filter === "This week" ? "outline" : "ghost"}
                        onClick={() => handleFilter("This week")}
                    >
                        This week
                    </Button>
                    <Button
                        className={cn("hover:underline")}
                        variant={filter === "This month" ? "outline" : "ghost"}
                        onClick={() => handleFilter("This month")}
                    >
                        This month
                    </Button>
                </div>

                <Link to="/add-new">
                    <Button>Add New</Button>
                </Link>
            </div>

            {/* All Notes */}
            {filteredNotes.length === 0 ? (
                <div className="h-full grid place-items-center">
                    <p className="text-gray-500 text-center mt-5">
                        No notes to display
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {filteredNotes.map((note, index) => {
                        const idx = Math.floor(Math.random() * colors.length);
                        //? day name and time
                        const time = note.date.toTimeString().split(" ")[0];
                        const day = dayNames[note.date.getDay()];
                        return (
                            <Card
                                key={index}
                                className={cn(
                                    "",
                                    note.backgroundColor || colors[idx],
                                )}
                            >
                                <CardHeader>
                                    <CardTitle className="flex justify-between border-b border-black pb-2">
                                        <span>{note.title}</span>

                                        <Link to={`edit-note/${note._id}`} className="flex flex-row gap-2">
                                            <Edit className="cursor-pointer" />
                                        </Link>
                                        <Delete onClick={() => handleDelete(note._id)} className="cursor-pointer"/>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{parse(note.content)}</p>
                                </CardContent>
                                <CardContent>
                                    <p><span className="bg-yellow-600 text-white px-2 py-1 rounded-md text-sm me-2">
                                        Mood: {note.sentiment}    
                                    </span></p>
                                </CardContent>
                                <CardFooter className="text-black font-bold flex flex-col justify-start items-start">
                                    <CardDescription>
                                        {note.tags && note.tags.map((tag, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    className="bg-green-800 text-white px-2 py-1 rounded-md text-sm me-2"
                                                >
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </CardDescription>
                                    {/* {<p>{`${time}, ${day}`}</p>} */}
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
