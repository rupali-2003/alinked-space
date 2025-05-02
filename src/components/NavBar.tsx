
import { Search, Bell, MessageSquare, User, Home, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-14">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-linkedin-blue" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-1.5 rounded bg-linkedin-light focus:bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-linkedin-blue w-64"
            />
          </div>
        </div>

        <nav className="flex items-center">
          <ul className="flex items-center space-x-1 sm:space-x-2">
            <NavItem 
              icon={<Home />} 
              label="Home" 
              to="/"
              active={location.pathname === "/"} 
            />
            <NavItem 
              icon={<User />} 
              label="My Network" 
              to="/network"
              notification={51} 
              active={location.pathname === "/network"}
            />
            <NavItem 
              icon={<Briefcase />} 
              label="Jobs" 
              to="/jobs"
              active={location.pathname === "/jobs"}
            />
            <NavItem 
              icon={<MessageSquare />} 
              label="Messaging" 
              to="/messaging"
              notification={6} 
              active={location.pathname === "/messaging"}
            />
            <NavItem 
              icon={<Bell />} 
              label="Notifications" 
              to="/notifications"
              notification={23} 
              active={location.pathname === "/notifications"}
            />
            <li className="flex flex-col items-center px-1 sm:px-3 relative">
              <Link to="/profile" className="flex flex-col items-center">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png" 
                    alt="User profile" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xs mt-0.5 hidden sm:block">Me</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  notification?: number;
  active?: boolean;
}

function NavItem({ icon, label, to, notification, active }: NavItemProps) {
  return (
    <li>
      <Link 
        to={to}
        className={cn(
          "flex flex-col items-center px-1 sm:px-3 py-1 relative",
          active && "border-b-2 border-linkedin-blue text-linkedin-blue"
        )}
      >
        <div className="relative">
          <div className="w-6 h-6">{icon}</div>
          {notification && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] bg-linkedin-notification text-white rounded-full">
              {notification}
            </span>
          )}
        </div>
        <span className="text-xs mt-0.5 hidden sm:block">{label}</span>
      </Link>
    </li>
  );
}
