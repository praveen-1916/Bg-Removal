import { useClerk, useUser } from "@clerk/clerk-react";
import { Typography } from "@material-tailwind/react";
import { motion } from "motion/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import headerImg from "../assets/header_img.png";
import BgRemovalContext from "../context/bgRemovalContext";

function Main() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const { removeBackground } = useContext(BgRemovalContext);

  const handleImage = (e) => {
    if (isSignedIn) {
      removeBackground(e.target.files[0]);
      navigate("/bg-remove");
    } else {
      openSignIn({});
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col max-w-5xl lg:mx-auto mx-10 items-center gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0.2, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="md:text-start text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
          >
            <Typography className="md:text-5xl sm:text-4xl text-3xl font-semibold">
              Remove the <br />
              <span className="text-purple-600">background</span> from images
              for free.
            </Typography>
            {/* <Typography className="md:text-6xl sm:text-5xl text-4xl text-center font-normal">
            <span className="text-pink-500">image,</span> in seconds.
          </Typography> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Typography variant="small" className="my-5 md:text-md text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever.
            </Typography>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 0.5 },
              opacity: { delay: 0.8, duration: 1 },
            }}
          >
            <input
              type="file"
              onChange={handleImage}
              accept="image/*"
              hidden
              id="myImage"
            />
            <label
              htmlFor="myImage"
              className="flex items-center gap-3 rounded-full px-12 py-3.5 md:mx-0 mx-auto text-sm cursor-pointer text-white w-max font-bold uppercase bg-transparent bg-gradient-to-r from-[#7C48FE] to-[#C849F8]"
            >
              Upload Image
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </label>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.2, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            src={headerImg}
            // src={image ? URL.createObjectURL(image) : headerImg}
            alt="Header Image"
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </>
  );
}

export default Main;
