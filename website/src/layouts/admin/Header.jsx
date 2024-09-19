import SheetMenu from './SheetMenu';
import SidebarToggle from './SidebarToggle';
import UserNav from './UserNav';

const Header = ({ isOpen, onToggleOpen }) => {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary flex">
            <div className="mx-4 flex w-full h-14 items-center justify-between">
                <div>
                    <SidebarToggle isOpen={ isOpen } onToggleOpen={ onToggleOpen } />
                    <div className="flex items-center space-x-4 lg:space-x-0">
                        <SheetMenu />
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className="flex flex-1 items-center justify-end w-full">
                        <UserNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;