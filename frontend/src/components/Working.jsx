import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { motion } from "motion/react";
import React from "react";

const workingProcedure = [
  {
    icon: ArrowUpTrayIcon,
    title: "Upload Image",
    description:
      "Upload an existing image that you want to remove background from your device.",
  },
  {
    icon: XMarkIcon,
    title: "Remove Background",
    description:
      "Click on the remove background button and see the magic of the website.",
  },
  {
    icon: ArrowDownTrayIcon,
    title: "Download Image",
    description:
      "Download the background removed image! By clicking the download button.",
  },
];

function Working() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="my-28"
      >
        <div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-[#353535] to-[#9B9B9B]">
          <Typography variant="h3">Steps to remove background</Typography>
          <Typography variant="h3">image in seconds</Typography>
        </div>
        <div className="grid max-w-5xl md:grid-cols-3 sm:grid-cols-2 gap-7 lg:mx-auto mx-10 mt-10">
          {workingProcedure.map(({ icon, title, description }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-transparent rounded-md border-[#E1E1E1] border">
                <CardBody className="flex justify-center gap-3">
                  <IconButton
                    size="sm"
                    className="w-full bg-gradient-to-b from-[#7C48FE] to-[#C849F8]"
                  >
                    {React.createElement(icon, {
                      className: "h-5 w-5",
                    })}
                  </IconButton>
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      {title}
                    </Typography>
                    <Typography className="font-normal text-sm text-[#7c7c7c]">
                      {description}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default Working;
