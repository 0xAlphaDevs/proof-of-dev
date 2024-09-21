"use client";
import React, { useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { useAccount, useReadContract } from "wagmi";
// import { createEndorsementAttestation } from "@/lib/createEndorsementAttestation";
import { getAttestationsForUser } from "@/lib/getAttestations";

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
  const [loading, setLoading] = React.useState<boolean>(true);
  const [podScore, setPodScore] = React.useState<number>(0);
  const [data, setData] = React.useState({
    username: "..",
    bio: "..",
    github: "..",
    twitter: "..",
    farcaster: "..",
  });
  const [endorsements, setEndorsements] = React.useState<any[]>([]);

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

  function getPodScore(endorsements: any[]) {
    let score = 0;
    for (let i = 0; i < endorsements.length; i++) {
      score += Number(endorsements[i].rating);
    }
    setPodScore((score / endorsements.length) * 20);
  }

  useEffect(() => {
    getPodScore(endorsements);
  }, [endorsements]);

  async function getAttestations(address: string) {
    const attestations = await getAttestationsForUser(address as string);
    console.log(attestations);
    let endorsementsArray: any[] = [];
    attestations.forEach((attestation: any) => {
      console.log(attestation);
      endorsementsArray.push({
        skill: attestation.data.skill,
        rating: attestation.data.rating,
        description: attestation.data.description,
      });
    });

    getPodScore(endorsementsArray);

    setEndorsements(endorsementsArray);
    setLoading(false);
  }

  useEffect(() => {
    if (address) {
      getAttestations(address as string);
    }
  }, [address]);

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
    <div className="flex flex-col gap-2 px-[15%]">
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
            {loading ? 0 : podScore.toFixed(0)}
          </p>
          <p className="font-semibold text-gray-500">POD Score</p>
        </div>
      </div>

      {/* user socials */}
      <div className="flex flex-col gap-4">
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
            href={`https://warpcast.com/${data.farcaster}`}
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
          {loading ? (
            <>Loading...</>
          ) : (
            endorsements.map((endorsement, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <p>
                      Skill :{" "}
                      <span className="bg-gray-500 text-white text-sm font-semibold rounded-full px-2 py-0.5">
                        {endorsement.skill}
                      </span>
                    </p>
                    <StarRating rating={endorsement.rating} />
                  </CardTitle>
                  <CardDescription className="">
                    {endorsement.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
