import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout() {
    return (
        <main className="min-h-screen overflow-x-hidden flex flex-col">
            <Header />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </main>
    );
}
