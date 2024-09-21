"use client";
import React, { useEffect } from "react";
import { UserDetails } from "@/app/components/dashboard/UserDetails";
import { useAccount, useReadContract } from "wagmi";
import {
  address as podAddress,
  abi as podAbi,
} from "@/lib/contracts/PODProfile.json";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { address } = useAccount();
  const router = useRouter();

  const [userExists, setUserExists] = React.useState<boolean>(false);

  const { data: user, isLoading } = useReadContract({
    address: podAddress as `0x${string}`,
    abi: podAbi,
    functionName: "getUserProfile",
    args: [address],
  });

  useEffect(() => {
    if (user) {
      setUserExists(true);
      router.push("/profile");
    }
  }, [user]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>{!userExists && <UserDetails />}</div>
      )}

      <div></div>
    </div>
  );
};

export default Dashboard;
