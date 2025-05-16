
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const MainLayout = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-squash-primary rounded-full"></div>
            <h1 className="text-xl font-bold text-squash-dark hidden sm:inline-block">SquashMatch</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => logout()}
              className="text-sm text-gray-600 hover:text-squash-primary"
            >
              Sign Out
            </button>
            <NavLink 
              to="/app/profile" 
              className={({ isActive }) => 
                `flex items-center space-x-1 ${isActive ? 'text-squash-primary' : 'text-gray-600 hover:text-squash-primary'}`
              }
            >
              <User size={20} />
              <span className="hidden sm:inline text-sm">{user?.name || 'Profile'}</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <nav className="bg-white shadow-[0_-1px_2px_rgba(0,0,0,0.05)] fixed bottom-0 left-0 right-0 p-4">
        <div className="container mx-auto flex justify-around">
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) => 
              `flex flex-col items-center ${isActive ? 'text-squash-primary' : 'text-gray-600 hover:text-squash-primary'}`
            }
          >
            <div className="h-6 w-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
            </div>
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          
          <NavLink
            to="/app/find-game"
            className={({ isActive }) => 
              `flex flex-col items-center ${isActive ? 'text-squash-primary' : 'text-gray-600 hover:text-squash-primary'}`
            }
          >
            <div className="h-6 w-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <span className="text-xs mt-1">Find</span>
          </NavLink>
          
          <NavLink
            to="/app/offer-game"
            className={({ isActive }) => 
              `flex flex-col items-center ${isActive ? 'text-squash-primary' : 'text-gray-600 hover:text-squash-primary'}`
            }
          >
            <div className="h-6 w-6 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-squash-primary/10 rounded-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
            </div>
            <span className="text-xs mt-1">Offer</span>
          </NavLink>
          
          <NavLink
            to="/app/calendar"
            className={({ isActive }) => 
              `flex flex-col items-center ${isActive ? 'text-squash-primary' : 'text-gray-600 hover:text-squash-primary'}`
            }
          >
            <div className="h-6 w-6 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs mt-1">Calendar</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
