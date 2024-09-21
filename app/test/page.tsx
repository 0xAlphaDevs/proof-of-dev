"use client";
import React from "react";
import { useEnsName, useEnsText } from "wagmi";
import { normalize } from "viem/ens";

const Test = () => {
  // const { data } = useEnsName({
  //   address: "0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C",
  //   chainId: 11155111,
  // });

  // console.log(data);

  const { data } = useEnsText({
    name: normalize("test.pod.eth"),
    key: "sldfj",
  });

  console.log("ens name --", data);
  return <div className="bg-red-500 text-white">Test </div>;
};

export default Test;
