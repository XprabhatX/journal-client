import Notes from "@/components/notes";
import Sidebar from "@/components/sidebar";

export default function Home() {
    return (
        <main className="relative flex flex-row min-h-screen max:max">
            <Sidebar />

            <section className="flex flex-col justify-start p-8 gap-6 items-start w-full">
                <p className="font-bold text-4xl">My Notes</p>

                <Notes />
            </section>
        </main>
    );
}
