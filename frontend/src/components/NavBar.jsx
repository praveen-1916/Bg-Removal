import React, { useEffect } from "react";
import { Button, Navbar, Typography } from "@material-tailwind/react";

import bgRemovalLogo from "/favicon.svg";
import { StarIcon } from "@heroicons/react/24/solid";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import BgRemovalContext from "../context/BgRemovalContext";

function NavBar() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const { getCreditBalance, creditBalance } = useContext(BgRemovalContext);

  useEffect(() => {
    if (isSignedIn) {
      getCreditBalance();
    }
  }, [isSignedIn]);

  return (
    <Navbar
      className="max-w-full md:px-20 sm:px-14 px-10 py-5 bg-transparent"
      blurred={false}
      shadow={false}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-1">
          {/* <PhotoIcon className="h-7 w-7 text-pink-400" strokeWidth={2.5} /> */}
          <img src={bgRemovalLogo} alt="Bg-Removal Logo" className="h-7 w-7" />
          <Typography color="blue-gray" variant="h5">
            Bg.Removal
          </Typography>
        </div>
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <div className="bg-[#D7EBFF] rounded-full px-3 sm:px-6  py-1 sm:py-1.5 flex items-center">
              <StarIcon className="h-4 w-4 mr-1 text-[#007aff]" />
              <Typography
                color="blue-gray"
                variant="small"
                className="flex items-center"
              >
                <span className="sm:block hidden">Credits</span> :
                {creditBalance}
              </Typography>
            </div>
            <UserButton />
          </div>
        ) : (
          <Button
            variant="gradient"
            onClick={() => openSignIn({})}
            className="flex items-center gap-2 py-2.5 px-4 sm:px-6 md:px-10 rounded-full bg-transparent bg-gradient-to-r from-[#7C48FE] to-[#C849F8]"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        )}
      </div>
    </Navbar>
  );
}

export default NavBar;
