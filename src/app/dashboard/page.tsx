"use client"
import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Assistant from "../Assistant";
import { auth } from "../../../config.js"; // Import auth from config.js

function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <nav className="bg-blue-600 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center">
                        <span className="text-white mr-4">
                            {user ? `Welcome, ${user.displayName}` : "Guest"}
                        </span>
                        <button onClick={handleLogOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <main className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
                <div className="flex-1 p-8 rounded-lg shadow-md bg-white w-full">
                    <Assistant />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;