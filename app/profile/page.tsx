"use client";
import React, { useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { useAccount, useReadContract } from "wagmi";
import { getNamesForAddress } from "@ensdomains/ensjs/subgraph";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { createEnsPublicClient } from "@ensdomains/ensjs";
import { namehash } from "@ensdomains/ensjs/utils";
// import { createEndorsementAttestation } from "@/lib/createEndorsementAttestation";
// import { getAttestationsForUser, getAttestations } from "@/lib/getAttestations";
import { HeartIcon, Volume1Icon } from "lucide-react";
import { Separator } from "../components/ui/separator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
import {
  address as podAddress,
  abi as podAbi,
} from "@/lib/contracts/PODProfile.json";

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  return (
    <p>
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index}>{index < rating ? "★" : "☆"}</span>
      ))}
    </p>
  );
};

const Profile = () => {
  const { address } = useAccount();
  const [data, setData] = React.useState<any>({
    username: "..",
    bio: "..",
    github: "..",
    twitter: "..",
    farcaster: "..",
  });

  const { data: user } = useReadContract({
    address: podAddress as `0x${string}`,
    abi: podAbi,
    functionName: "getUserProfile",
    args: [address],
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      setData({
        username: user?.username,
        bio: user?.bio,
        github: user?.github,
        twitter: user?.twitter,
        farcaster: user?.farcaster,
      });
    }
  }, [user]);

  // async function getSubnames(address: string) {
  //   // const subnames = await fetch(
  //   //   `https://api.ens.domains/subnames/${address}`
  //   // ).then((res) => res.json());
  //   // console.log(subnames);
  //   // Create the client
  //   const client = createEnsPublicClient({
  //     chain: sepolia,
  //     transport: http(process.env.NEXT_PUBLIC_SEPOLIA_API_URL),
  //   });

  //   // Use the client
  //   // const ethAddress = await client.getAddressRecord({ name: "test1.pod.eth" });
  //   // console.log(ethAddress);

  //   // @ts-expect-error - leave this alone
  //   const result = await getNamesForAddress(client, {
  //     address: address,
  //     filter: {
  //       wrappedOwner: "0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C",
  //     },
  //   });

  //   console.log(result);
  // }

  // useEffect(() => {
  //   getSubnames(address as string);
  // }, [address]);

  // function test() {
  //   // getSubnames(address);
  //   const nameHash = namehash("test1.pod.eth");
  //   console.log(nameHash);

  //   // console.log(nameHash);
  //   // createEndorsementAttestation();
  //   // getAttestationsForUser();
  //   // getAttestation("onchain_evm_11155111_0x335");
  // }

  // useEffect(() => {
  // const data = localStorage.getItem("pod-identity");
  // if (data) {
  //   const parsedData = JSON.parse(data);
  //   console.log(parsedData);
  //   setData(parsedData);
  // }
  // }, []);

  return (
    <div className="flex flex-col gap-2 px-[10%]">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage src="./logo.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            {/* username */}
            <p className="font-bold text-xl">{data.username}</p>
            <p className="font-semibold text-gray-500">{data.bio}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <p className="text-white text-center bg-green-500 rounded-lg p-2 text-4xl font-bold">
            100
          </p>
          <p className="font-semibold text-gray-500">POD Score</p>
        </div>
      </div>

      {/* user socials */}
      <div className="flex flex-col gap-4 pr-40">
        <div className="flex gap-6 items-center pl-28 mb-2">
          <a
            href={`https://github.com/${data.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" rounded-lg px-2 py-1"
          >
            <Image src="/github.png" width={30} height={30} alt="github" />
          </a>
          <a
            href={`https://x.com/${data.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" rounded-lg px-2 py-1"
          >
            <Image
              src="/twitter.png"
              width={30}
              height={30}
              className="rounded-lg"
              alt="twitter"
            />
          </a>
          <a
            href={`https://farcaster.com/${data.farcaster}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" rounded-lg px-2 py-1"
          >
            <Image
              src="/farcaster.jpg"
              width={30}
              height={30}
              className="rounded-lg"
              alt="farcaster"
            />
          </a>
        </div>

        {/* <div className="flex gap-4 items-center pl-28">
          <Button variant="outline" className="w-full">
            <Volume1Icon className="h-6 w-6 text-green-500 pr-1" /> Endorse
          </Button>
          <Button variant="outline" className="w-full">
            {" "}
            <HeartIcon className="h-6 w-6 text-red-500 pr-1" /> Sponser
          </Button>
        </div> */}

        <div className="flex flex-col gap-4 pt-4">
          <p className="font-semibold text-xl">Endorsements Received</p>
          <Separator className="my-1" />
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <p>
                  Skill :{" "}
                  <span className="bg-gray-500 text-white text-sm font-semibold rounded-full px-2 py-0.5">
                    Front-end
                  </span>
                </p>
                <StarRating rating={4} />
              </CardTitle>
              <CardDescription className="">
                This is a sample description
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
