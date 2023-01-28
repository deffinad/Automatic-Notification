import React from "react";
import Lottie from "react-lottie";
import animationLoading from "../../assets/lotties/loading.json";

export const Loading = ({height, width}) => {
  const optionLottie = {
    loop: true,
    autoplay: true,
    animationData: animationLoading,
    renderedSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Lottie
      options={optionLottie}
      height={height}
      width={width}
      isClickToPauseDisabled={true}
    />
  );
};
