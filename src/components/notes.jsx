import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Edit } from "lucide-react";

export default function Notes() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Note 1",
            description: "This is the first note",
            content: "This is the content of the first note",
            date: new Date(),
            backgroundColor: "bg-blue-500",
        },
        {
            id: 2,
            title: "Note 2",
            description: "This is the second note",
            content: "This is the content of the second note",
            date: new Date(),
            backgroundColor: "bg-blue-500",
        },
        {
            id: 3,
            title: "Note 3",
            description: "This is the third note",
            content: "This is the content of the third note",
            date: new Date(),
            backgroundColor: "bg-blue-500",
        },
        {
            id: 4,
            title: "Note 3",
            description: "This is the third note",
            content: "This is the content of the third note",
            date: new Date(),
            backgroundColor: "bg-rose-500",
        },
    ]);
    const [filter, setFilter] = useState("all");

    //? The useEffect wuill run when the filter changes

    useEffect(() => {
        //? Fetch notes from the server
        // setNotes([])
    }, [filter]);

    const handleFilter = (new_filter) => {
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
            {notes.length === 0 ? (
                <div className="h-full grid place-items-center">
                    <p className="text-gray-500 text-center mt-5">
                        No notes to display
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {notes.map((note, index) => {
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

                                        <Link to={`note/:${note.id}`}>
                                            <Edit className="cursor-pointer" />
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{note.content}</p>
                                </CardContent>
                                <CardFooter className="text-black font-bold">
                                    <p>{`${time}, ${day}`}</p>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
