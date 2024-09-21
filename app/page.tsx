"use client";

import { DynamicWidget } from "@/lib/dynamic";
import {
  VerificationLevel,
  IDKitWidget,
  ISuccessResult,
} from "@worldcoin/idkit";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
// import DynamicMethods from "@/app/components/Methods";
import "./page.css";
import { verify } from "@/lib/actions/verify";
import Image from "next/image";
import { Card, CardDescription, CardHeader } from "@/app/components/ui/card";

// const checkIsDarkSchemePreferred = () => {
//   if (typeof window !== "undefined") {
//     return window.matchMedia?.("(prefers-color-scheme:dark)")?.matches ?? false;
//   }
//   return false;
// };

export default function Main() {
  // const [isDarkMode, setIsDarkMode] = useState(checkIsDarkSchemePreferred);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  //  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const { address, isConnected } = useAccount();

  // useEffect(() => {
  //   const darkModeMediaQuery = window.matchMedia(
  //     "(prefers-color-scheme: light)"
  //   );
  //   const handleChange = () => setIsDarkMode(checkIsDarkSchemePreferred());

  //   darkModeMediaQuery.addEventListener("change", handleChange);
  //   return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  // }, []);

  useEffect(() => {
    if (address && isConnected) {
      const storedValue = localStorage.getItem(address);
      if (storedValue === "true") {
        setIsVerified(true);
        router.push("/dashboard");
      }
    }
  }, [address, isConnected, router]);

  const onSuccess = async (result: ISuccessResult) => {
    try {
      // setIsLoading(true);
      const verificationResult = await verify(result);
      if (verificationResult.success) {
        localStorage.setItem(address as string, "true");
        setIsVerified(true);
        router.push("/dashboard");
        //  setCreatorSession({ proof: result, verified: true });
      }
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit:", JSON.stringify(result));
    try {
      const data = await verify(result);
      console.log("Response from backend:", JSON.stringify(data));
      if (data.success) {
        console.log("Successful verification");
        onSuccess(result);
      } else {
        throw new Error(`Verification failed: ${data.detail}`);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      // setIsLoading(false);
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-between py-12 px-24">
        <div
          className="flex items-center gap-4 font-bold"
        >
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
          <span className="text-3xl">Proof of Dev</span>
        </div>
        <div className="font-semibold text-white bg-violet-500 rounded-full px-2 py-1">ETHGlobal 2024 Hackathon</div>
      </div>

      <div className="mt-20 flex flex-col items-center justify-center gap-8 px-8 py-4">
        <DynamicWidget />
        {isConnected ? (
          !isVerified ? (
            <IDKitWidget
              action={process.env.NEXT_PUBLIC_WLD_ACTION!}
              app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
              onSuccess={onSuccess}
              handleVerify={handleProof}
              verification_level={VerificationLevel.Orb}
            >
              {({ open }) => (
                <button onClick={open}>Verify with World ID</button>
              )}
            </IDKitWidget>
          ) : (
            <p className="text-sm font-semibold text-gray-500">Wallet already verified. Redirecting to dashboard...</p>
          )
        ) : (
          <p className="text-sm font-semibold text-gray-500">Please connect your wallet to get started.</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-8 px-20 mt-20">
        <Card className="shadow-sm border-none h-full w-full rounded-lg bg-violet-400 bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardDescription className="text-center pt-1 text-lg text-black">
              This is a sample feature
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full rounded-lg bg-violet-400 bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardDescription className="text-center pt-1 text-lg text-black">
              This is a sample feature
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-sm border-none h-full w-full rounded-lg bg-violet-400 bg-opacity-15 border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardDescription className="text-center pt-1 text-lg text-black">
              This is a sample feature
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="fixed mx-[39%] bottom-4">
        {/* <hr className="border-t-1 border-slate-600 mb-4" /> */}
        <div className="flex justify-center items-center">
          <p className="text-muted-foreground">
            &copy;{" "}
            <a href="https://www.alphadevs.dev/" target="_blank">
              Team AlphaDevs
            </a>{" "}
            | All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
