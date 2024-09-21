"use client";

//@ts-expect-error - This is a client-side only file
import { DynamicWidget } from "@/lib/dynamic";
import { VerificationLevel, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
// import DynamicMethods from "@/app/components/Methods";
import "./page.css";
import { verify } from "@/lib/actions/verify";

const checkIsDarkSchemePreferred = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia?.("(prefers-color-scheme:dark)")?.matches ?? false;
  }
  return false;
};

// // Check if the wallet is already verified using localStorage
// const isWalletVerified = (walletAddress: string) => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem(walletAddress) === "true";
//   }
//   return false;
// };

export default function Main() {
  const [isDarkMode, setIsDarkMode] = useState(checkIsDarkSchemePreferred);
  //  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleChange = () => setIsDarkMode(checkIsDarkSchemePreferred());

    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);


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
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <div className="header">
        <img
          className="logo"
          src={isDarkMode ? "/logo-light.png" : "/logo-dark.png"}
          alt="dynamic"
        />
        <div className="header-buttons">
          <button
            className="docs-button"
            onClick={() =>
              window.open(
                "https://docs.dynamic.xyz",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Docs
          </button>
          <button
            className="get-started"
            onClick={() =>
              window.open(
                "https://app.dynamic.xyz",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Get started
          </button>
        </div>
      </div>

      <div className="modal">
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
              {({ open }) => <button onClick={open}>Verify with World ID</button>}
            </IDKitWidget>
          ) : (
            <p>Wallet already verified. Redirecting to dashboard...</p>
          )
        ) : (
          <p>Please connect your wallet to verify.</p>
        )}
      </div>

      {/* <div className="footer">
        <div className="footer-text">Made with ❤️ by dynamic</div>
        <img className="footer-image" src={isDarkMode ? "/image-dark.png" : "/image-light.png"} alt="dynamic" />
      </div> */}
    </div>
  );
}
