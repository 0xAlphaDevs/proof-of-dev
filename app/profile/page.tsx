"use client";
import React, { useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { useAccount } from "wagmi";
import { getNamesForAddress } from "@ensdomains/ensjs/subgraph";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { createEnsPublicClient } from "@ensdomains/ensjs";
// import { namehash } from "@ensdomains/ensjs/utils";
import { createEndorsementAttestation } from "@/lib/createEndorsementAttestation";
import { getAttestationsForUser, getAttestations } from "@/lib/getAttestations";

const Profile = () => {
  const { address } = useAccount();

  async function getSubnames(address: string) {
    // const subnames = await fetch(
    //   `https://api.ens.domains/subnames/${address}`
    // ).then((res) => res.json());
    // console.log(subnames);
    // Create the client
    const client = createEnsPublicClient({
      chain: sepolia,
      transport: http(process.env.NEXT_PUBLIC_SEPOLIA_API_URL),
    });

    // Use the client
    // const ethAddress = await client.getAddressRecord({ name: "test1.pod.eth" });
    // console.log(ethAddress);

    // @ts-expect-error - leave this alone
    const result = await getNamesForAddress(client, {
      address: address,
      filter: {
        wrappedOwner: "0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C",
      },
    });

    console.log(result);
  }

  useEffect(() => {
    getSubnames(address as string);
  }, [address]);

  function test() {
    // getSubnames(address);
    // const nameHash = namehash("test1.pod.eth");
    // console.log(nameHash);
    // createEndorsementAttestation();
    getAttestationsForUser();
    // getAttestation("onchain_evm_11155111_0x335");
  }

  return (
    <div className="flex flex-col gap-4 px-[20%]">
      <div className="flex gap-4 items-center">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex gap-16 items-center">
            <p className="font-bold text-xl">Shadcn</p>
            <p className=" font-semibold">
              POD Score :{" "}
              <span className="text-white bg-green-600 rounded-full font-normal text-sm px-2 py-0.5">
                100
              </span>
            </p>
          </div>

          <p className="font-semibold text-gray-500">
            Pro Front-end Developer | Building Shadcn | @Vercel{" "}
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <a
          href="https://github.com/0xyshv"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://x.com/0xyshv"
          target="_blank"
          rel="noopener noreferrer"
        >
          X / Twitter
        </a>
        <a
          href="https://farcaster.xyz/0xyshv"
          target="_blank"
          rel="noopener noreferrer"
        >
          Farcaster
        </a>
      </div>

      <div className="flex gap-4 items-center">
        <Button variant="outline" onClick={test}>
          Endorse
        </Button>
        <Button variant="outline">Sponser</Button>
      </div>
      <div className="flex gap-4 items-center">Endorsements Received</div>
    </div>
  );
};

export default Profile;
