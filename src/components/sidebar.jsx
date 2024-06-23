import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Sidebar() {
    return (
        <section className="lg:w-80 md:w-40 self-start hidden md:block p-5 bg-white border-r border-slate-100">
            <div className="flex h-full max-h-screen flex-col justify-between gap-2">
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
        </section>
    );
}
