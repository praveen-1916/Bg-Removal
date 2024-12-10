import React, { useState } from "react";
import withBg from "../assets/image_w_bg.png";
import withoutBg from "../assets/image_wo_bg.png";
import { Typography } from "@material-tailwind/react";
import "../App.css";

function Demo() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const handleSlider = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <>
      <div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-[#353535] to-[#9B9B9B]">
        <Typography variant="h3">Remove Background With High </Typography>
        <Typography variant="h3">Quality & Accuracy</Typography>
      </div>
      <div className="relative md:max-w-3xl max-w-xl md:mx-auto mx-10 overflow-hidden rounded-xl mt-10">
        <img
          src={withBg}
          alt="Original imgaes"
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
        />
        <img
          src={withoutBg}
          alt="Background removed image"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          className="absolute top-0 left-0 w-full h-full"
        />
        <input
          type="range"
          name="imageVisibility"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSlider}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full slider"
        />
      </div>
    </>
  );
}

export default Demo;
