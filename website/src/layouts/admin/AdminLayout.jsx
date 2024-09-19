import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Header from "./Header";


export default function AdminLayout() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Sidebar isOpen={ isOpen } onToggleOpen={ setIsOpen } />
            <main
                className={ cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    !isOpen ? "lg:ml-[90px]" : "lg:ml-72"
                ) }
            >
                <div>
                    <Header isOpen={ isOpen } onToggleOpen={ setIsOpen } />
                    <div className="pt-4 pb-10 px-4 sm:px-8">
                        <Outlet />
                    </div>
                </div>
            </main>
            <footer
                className={ cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    !isOpen ? "lg:ml-[90px]" : "lg:ml-72"
                ) }
            >
                <Footer />
            </footer>
        </>
    );
}


