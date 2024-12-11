import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import { motion } from "motion/react";
import withBg from "../assets/image_w_bg.png";
import withoutBg from "../assets/image_wo_bg.png";
import { Link } from "react-router-dom";
import BgRemovalContext from "../context/bgRemovalContext";

function BgRemove() {
  const { image, removedBgImage, removeBackground, imageLoading } =
    useContext(BgRemovalContext);

  const handleImage = (e) => {
    removeBackground(e.target.files[0]);
  };

  return (
    <>
      <div>
        <Breadcrumbs className="bg-transparent sm:ml-24 ml-3 mt-10">
          <Link to="/" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Link className="opacity-60 text-base">
            <span>Image Genaration</span>
          </Link>
        </Breadcrumbs>
        <Card className="bg-transparent max-w-5xl md:mx-auto mx-10 mt-8">
          <CardBody className="grid md:grid-cols-2 place-items-center gap-5 p-10">
            <div className="">
              <Typography variant="h5" color="blue-gray" className="text-start">
                Original
              </Typography>
              <img
                src={image ? URL.createObjectURL(image) : withBg}
                alt="Image with background"
                className=" rounded-md mt-4 object-cover object-center"
              />
            </div>
            <div className="">
              <Typography variant="h5" color="blue-gray">
                Removed Background
              </Typography>

              {imageLoading ? (
                <Spinner className="h-5 w-5" />
              ) : (
                <img
                  src={withoutBg}
                  alt="Image without background"
                  className="rounded-md mt-4 object-cover"
                />
              )}
            </div>
          </CardBody>
          <CardFooter className="flex sm:flex-row flex-col items-center gap-5 justify-end">
            <input
              type="file"
              onChange={handleImage}
              accept="image/*"
              hidden
              id="myImage"
            />
            <label htmlFor="myImage">
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
                <Button variant="outlined" className="rounded-full" size="lg">
                  Try another image
                </Button>
                Image
              </motion.div>
            </label>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                default: { duration: 0.5 },
                opacity: { delay: 0.8, duration: 1 },
              }}
              className="rounded-full px-10 sm:py-4 py-3.5 cursor-pointer bg-transparent bg-gradient-to-r from-[#7C48FE] to-[#C849F8] text-white"
            >
              Download image
            </motion.a>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default BgRemove;
