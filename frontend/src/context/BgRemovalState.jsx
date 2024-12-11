import React from "react";
import BgremovalContext from "./bgRemovalContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";

function BgRemovalState(props) {
  const [image, setImage] = useState(null);
  const [removedBgImage, setRemovedBgImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const { getToken } = useAuth();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const alertFunc = (msg, success) => {
    if (success) {
      Toast.fire({
        icon: "success",
        title: msg,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: msg,
      });
    }
  };

  const removeBackground = async (image) => {
    try {
      setImageLoading(true);
      setImage(image);
      // const formData = new FormData();
      // formData.append(image);
      const token = await getToken();

      const url =
        import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_URL_REMOVE_BG;

      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(image),
      });
      const data = await responce.json();
      if (data.success) {
        setImageLoading(false);
        setRemovedBgImage(data.resultImage);
        alertFunc(data.message, data.success);
        getCreditBalance();
      } else {
        setImageLoading(false);
        alertFunc(data.message, data.success);
      }
    } catch (error) {
      console.error(error.message);
      alertFunc(error.message, false);
      setImageLoading(false);
    }
  };

  const [creditBalance, setCreditBalance] = useState(0);
  const getCreditBalance = async () => {
    try {
      const token = await getToken();
      const url =
        import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_GET_CREDITS;

      const responce = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await responce.json();
      if (data.success) {
        setCreditBalance(data.creditBalance);
      } else {
        alertFunc(data.message, data.success);
      }
    } catch (error) {
      console.error(error.message);
      alertFunc(error.message, false);
    }
  };

  return (
    <BgremovalContext.Provider
      value={{
        image,
        removedBgImage,
        imageLoading,
        removeBackground,
        getCreditBalance,
        creditBalance,
      }}
    >
      {props.children}
    </BgremovalContext.Provider>
  );
}

export default BgRemovalState;
