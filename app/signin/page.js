import React from "react";
import SignIn from "./components/SignIn";

export default function SignInPage() {
    return(
            <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
              <div className="max-w-screen-xl bg-white  shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 bg-[#f5e0cd] text-center hidden md:flex">
                  <div
                    className="m-12 xl:m-16 w-full h-100 bg-[url('/img/girlpic.jpg')] bg-contain bg-center bg-no-repeat"
                  ></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                  <div className="flex flex-col items-center">
                    <div className="text-center">
                      <h1 className="text-2xl xl:text-4xl font-extrabold text-[#5C4033]">
                        Sign In Here...
                      </h1>
                    </div>
                    <SignIn />
                  </div>
                </div>
              </div>
            </div>
    )
};