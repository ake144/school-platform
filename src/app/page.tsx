"use client";

import { getByClerkId, UpdateUser } from "@/lib/actions/create/user";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const Homepage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [role, setRole] = useState("Student"); // Initialize with empty state
  const [isLoading, setIsLoading] = useState(false); // Loading state to manage server updates




  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <h1>Welcome to School-X</h1>
      <p className="text-center mt-5">This is a School Management System</p>

      <div className="mt-5">
        {user ? (
          <div>
            <p>You are signed in as {user.fullName}</p>


            <button
              onClick={()=>router.push('/admin')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              disabled={isLoading || !role}
            >
              {isLoading ? "Loading..." : "Go to Dashboard"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Homepage;
