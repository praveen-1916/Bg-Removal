import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { motion } from "motion/react";
import profileImage1 from "../assets/profile_img_1.png";
import profileImage2 from "../assets/profile_img_2.png";
import profileImage3 from "../assets/profile_img_3.png";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import BgRemovalContext from "../context/BgRemovalContext";

const reviews = [
  {
    reviewId: 1,
    coustomerName: "Donald Jackman",
    coustomerReview:
      "I've been using bg-removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    coustomerProfile: profileImage1,
    coustomerRole: "Co-founder",
  },
  {
    reviewId: 2,
    coustomerName: "Richard Nelson",
    coustomerReview:
      "I've been using bg-removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    coustomerProfile: profileImage2,
    coustomerRole: "Content Creator",
  },
  {
    reviewId: 3,
    coustomerName: "James Washington",
    coustomerReview:
      "I've been using bg-removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    coustomerProfile: profileImage3,
    coustomerRole: "Co-founder",
  },
];

function CoustomerReviews() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const { creditBalance } = useContext(BgRemovalContext);

  const handleImage = (e) => {
    if (isSignedIn && creditBalance > 0) {
      removeBackground(e.target.files[0]);
      navigate("/bg-remove");
    }
    if (isSignedIn && creditBalance <= 0) {
      navigate("/buy-credits");
    } else {
      openSignIn({});
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-28"
      >
        <div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-[#353535] to-[#9B9B9B]">
          <Typography variant="h2">Customer testimonials</Typography>
          <Typography>What Our Users Are Saying</Typography>
        </div>

        <div className="grid max-w-6xl md:grid-cols-3 sm:grid-cols-2 gap-6 lg:mx-auto mx-10 mt-10">
          {reviews.map(
            (
              {
                coustomerName,
                coustomerProfile,
                coustomerRole,
                coustomerReview,
              },
              index
            ) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-transparent rounded-md border-[#E1E1E1] border">
                  <CardBody className="pt-0">
                    <Typography className="text-3xl font-bold mb-3">
                      ,,
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                      textGradient
                    >
                      {coustomerReview}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full">
                      <img src={coustomerProfile} alt="profile-picture" />
                    </div>
                    <div>
                      <Typography variant="h5" color="blue-gray">
                        {coustomerName}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-medium text-sm"
                        textGradient
                      >
                        {coustomerRole}
                      </Typography>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.2, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="my-32 flex items-center flex-col justify-center"
      >
        <Typography
          variant="h2"
          className="bg-clip-text text-transparent bg-gradient-to-r from-[#353535] to-[#9B9B9B]"
        >
          See the magic. Try now
        </Typography>

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
            className="flex items-center gap-3 mt-8 rounded-full px-12 py-3.5 text-sm cursor-pointer text-white w-max font-bold uppercase bg-transparent bg-gradient-to-r from-[#7C48FE] to-[#C849F8]"
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
    </>
  );
}

export default CoustomerReviews;
