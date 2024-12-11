import {
  Breadcrumbs,
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
import bgLayer from "../assets/bg_layer.png";
import { Link, useNavigate } from "react-router-dom";
import BgRemovalContext from "../context/bgRemovalContext";

function BgRemove() {
  const {
    image,
    removedBgImage,
    removeBackground,
    imageLoading,
    creditBalance,
  } = useContext(BgRemovalContext);
  const navigate = useNavigate();

  const handleImage = (e) => {
    if (creditBalance > 0) {
      removeBackground(e.target.files[0]);
    } else {
      navigate("/buy-credits");
    }
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
          <CardBody className="grid md:grid-cols-2 gap-5 p-10">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-start">
                Original
              </Typography>
              <img
                src={image ? URL.createObjectURL(image) : withBg}
                alt="Image with background"
                className="rounded-md mt-4 object-cover"
              />
            </div>
            <div>
              <Typography variant="h5" color="blue-gray">
                Removed Background
              </Typography>

              {imageLoading ? (
                <div
                  className="flex items-center justify-center mt-4 bg-cover max-h-[400px] h-full"
                  style={{ backgroundImage: `url(${bgLayer})` }}
                >
                  <Spinner className="h-10 w-10" color="purple" />
                </div>
              ) : (
                <img
                  src={removedBgImage ? removedBgImage : withoutBg}
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
              <label
                htmlFor="myImage"
                className="block cursor-pointer font-bold text-center uppercase text-sm py-3.5 px-7 border border-gray-900 text-gray-900 rounded-full"
              >
                Try another image
              </label>
              {/* <Button variant="outlined" className="rounded-full" size="lg"> */}
              {/* </Button> */}
            </motion.div>
            {removedBgImage && (
              <motion.a
                href={removedBgImage}
                download="Removed_Bg_Image"
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
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default BgRemove;
