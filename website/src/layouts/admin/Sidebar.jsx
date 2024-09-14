import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { IoDiamond } from "react-icons/io5";

const Sidebar = ({ isOpen }) => {
    return (
        <aside
            className={ cn(
                "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                !isOpen ? "w-[90px]" : "w-72 !no-scrollbar"
            ) }
        >
            <div className="relative h-full flex flex-col py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <div className='border-b-2 border-zinc-400 pb-4' >
                    <Link href="/dashboard" className="flex items-center gap-2 justify-center">
                        <IoDiamond className='text-2xl me-2' />
                        <h1
                            className={ cn(
                                "font-bold whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 text-2xl",
                                !isOpen
                                    ? "-translate-x-96 opacity-0 hidden"
                                    : "translate-x-0 opacity-100"
                            ) }
                        >
                            Diamond
                        </h1>
                    </Link>
                </div>
                <Menu isOpen={ isOpen } />
            </div>
        </aside>
    );
};

export default Sidebar;