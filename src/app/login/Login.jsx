"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!userName || !password) {
      toast.error("Please don't leave the fields empty");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/admin/login`,
        {
          method: "POST",
          body: JSON.stringify({
            userName,
            password,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        window.location.reload();
        router.push("/dashboard");
        toast.success("Login Successfull");
      }
      toast.error(result.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col  gap-5 border-white rounded-md p-3 border-2 items-center justify-center shadow-md shadow-white">
      <h1 className="text-3xl md:text-5xl font-bold">Admin Login</h1>
      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-4 text-black rounded-md border-none outline-none bg-base-400 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 text-black rounded-md border-none outline-none bg-base-400 w-full"
        />
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white p-2 font-bold"
        onClick={handleLogin}
      >
        {isLoading ? "Loading" : "Login"}
      </button>
    </div>
  );
};

export default Login;
