import React from "react";
import SignUp from "./components/signup";

export default function SignUpPage() {
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white  shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-[#f5e0cd] text-center hidden md:flex items-center justify-center">
          <div
            className="w-full h-[500px] bg-[url('/img/girlpic.jpg')] bg-contain bg-center bg-no-repeat"
          ></div>
        </div>

        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-[#5C4033]">
                Sign up Here...
              </h1>
            </div>
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}