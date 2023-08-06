"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react";

import Input from "@/components/Input";

const AuthPage = () => {
  //GETTING THE INPUT VALUES FROM USER
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    variant: "login",
  });

  const router = useRouter();
  //SAVING THEM IN THE STATE-VARIABLE
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setCredential((preCredential) => ({
      ...preCredential,
      [id]: value,
    }));
  };
  //GETTING THE BENEFIT OF REUSEABLE COMPONENT
  const toggleVariant = useCallback(() => {
    setCredential((prevCredential) => ({
      ...prevCredential,
      variant: prevCredential.variant === "login" ? "register" : "login",
    }));
  }, []);
  //FUNCTION WHICH WILL RESET THE INPUT FIELD TO THE EMPTY STRING
  const resetCredential = () => {
    setCredential({
      name: "",
      email: "",
      password: "",
      variant: "",
    });
  };
  //LOGIC FUNCTION WHEN USER HAVE CREATED SUCCEFULL ACCOUNT

  const login = useCallback(async () => {
    const { email, password } = credential;
    try {
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [credential]);
  //PERFORMING THE API REQUEST / SENDING DATA TO THE BACKEND
  const register = useCallback(async () => {
    const { name, email, password } = credential;
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        alert("Cannot request");
      } else {
        alert("Registration Succussfull");
        resetCredential();
      }
      const result = await res.json();
      login();
      return result;
    } catch (error) {
      alert("Canot register");
    }
  }, [credential, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5 lg:ml-0 ml-3">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center pb-8">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {credential.variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {credential.variant === "register" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={credential.name}
                  onChange={handleInputChange}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={credential.email}
                onChange={handleInputChange}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                value={credential.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={credential.variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {credential.variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => {
                  signIn("google", {
                    callbackUrl: "/",
                  });
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "/",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {credential.variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {credential.variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
