'use client'
import { useState, useEffect, use } from "react";
import {app} from '../../config.js'
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
    });

    return () => unsubscribe();

  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try{
      await signInWithPopup(auth, provider);
      router.push('/dashboard')
    }catch(error){
      console.error("Error signing in with Google", error.message);
    }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        user ? (
          <Dashboard/>
        ) :
        (
          <><h1 className="mb-10 font-bold text-3xl">Sign to use the assistant.</h1>
          <button onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign in With Google
          </button>
          </>
        )
      }
    </div>
  );
}