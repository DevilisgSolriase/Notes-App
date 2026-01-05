import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "aws-amplify/auth";
import { useAuth } from "../context/AuthContext";

export default function RootLayout() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  async function handleLogout() {
    try {
      await signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="font-serif text-gray-300 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 min-h-[80px] flex items-center text-white z-50 px-4 gap-6">
        <div className="text-3xl font-bold flex-none">Notes App</div>
        {/* Navigation */}
        <nav className="flex gap-4 flex-none justify-end flex-1 ml-auto p-2">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1 bg-gray-800 p-4">
        <Outlet />
      </main>
    </div>
  );
}
