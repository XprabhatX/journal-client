import { Link } from "react-router-dom";
import { User, Search, Menu, PlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileSidebar() {
    return (
        <div className="flex flex-col justify-between gap-8">
            <div className="mt-auto p-4 flex flex-col gap-5">
                <Link to="/" className="w-full">
                    <Button className="w-full" variant="secondary">
                        Home
                    </Button>
                </Link>
                <Link to="/add-new" className="w-full">
                    <Button className="w-full">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add New
                    </Button>
                </Link>
            </div>

            <Link to="/logout" className="w-full p-4">
                <Button className="w-full" variant="destructive">
                    Logout
                </Button>
            </Link>
        </div>
    );
}

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-background px-4 py-3 shadow-sm md:px-6">
            <Link to="/" className="flex select-none items-center gap-2">
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">My Book</span>
            </Link>
            <div className="relative flex-1 max-w-md max-md:hidden">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-md border border-input bg-muted px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-4">
            <Link to="/edit" className="w-full">
                <Button variant="ghost" size="icon" aria-label="Profile">
                    <User className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Menu"
                    className="md:hidden"
                >
                    <Sheet>
                        <SheetTrigger asChild>
                            <Menu className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="left">
                            <MobileSidebar />
                        </SheetContent>
                    </Sheet>
                </Button>
            </Link>
            </div>
        </header>
    );
}

function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}
