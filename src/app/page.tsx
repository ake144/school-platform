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


  
  const [userData, setUserData] = useState<any >(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const fetchedUser = await getByClerkId(user.id);
       if(fetchedUser){

       
        setUserData(fetchedUser);
 
       }

      }
    };

    fetchPosts();
  }, [user]);


  const handleRoleChange = async (newRole:string) => {
    setRole(newRole);
    if (!user || !user.id) return;

    try {
      setIsLoading(true);
      // Update the role in the database using the server action
      await UpdateUser({ id: user.id, data: { role: newRole, name:userData.name, email:userData.email} });


      alert(`Role updated to ${newRole}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <h1>Welcome to School-X</h1>
      <p className="text-center mt-5">This is a School Management System</p>

      <div className="mt-5">
        {user ? (
          <div>
            <p>You are signed in as {user.fullName}</p>

            <div className="flex flex-col items-center mt-5">
              <label className="mb-2">Select Your Role:</label>
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
                <option value="Parent">Parent</option>
              </select>
            </div>

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
