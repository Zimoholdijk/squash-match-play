
import React from 'react';
import { Outlet } from 'react-router-dom';

const OnboardingLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-squash-secondary/10 to-squash-primary/10">
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-squash-primary rounded-full"></div>
          <h1 className="text-2xl font-bold text-squash-dark">SquashMatch</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SquashMatch. All rights reserved.
      </footer>
    </div>
  );
};

export default OnboardingLayout;
