"use client";

import * as React from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createPublicClient, getContract, http, namehash } from "viem";
import { sepolia } from "viem/chains";
import { address, abi } from "@/lib/contracts/ENSRegistryWithFallback.json";

interface FormData {
  username: string;
  bio: string;
  twitter: string;
  github: string;
  farcaster: string;
}

export function UserDetails() {
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    bio: "",
    twitter: "",
    github: "",
    farcaster: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  async function checkRecordExists(label: string) {
    // create client
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(process.env.NEXT_PUBLIC_SEPOLIA_API_URL),
    });
    // 1. Create contract instance
    const contract = getContract({
      address: address as `0x${string}`,
      abi: abi,
      client: publicClient,
    });

    // 2. Call contract methods
    const nameHash: string = namehash(label);
    console.log(nameHash);

    const result = await contract.read.recordExists([nameHash]);

    console.log(result);
  }

  return (
    <div className="z-40">
      <p className="flex justify-center pb-4">
        Oh No! You dont have a POD Identity. Mint one now!
      </p>
      <div className="px-[30%]">
        <Card className="w-[]">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Mint your POD Identity
            </CardTitle>
            {/* <CardDescription>Enter the details below to mint your POD identities.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    placeholder="Enter your bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    placeholder="Enter your twitter handle"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="farcaster">Farcaster</Label>
                  <Input
                    id="farcaster"
                    name="farcaster"
                    placeholder="Enter your farcaster handle"
                    value={formData.farcaster}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="github">Github</Label>
                  <Input
                    id="github"
                    name="github"
                    placeholder="Enter your github username"
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Mint POD Identity
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* <button onClick={() => checkRecordExists("test1.pod.eth")}>
          Check Record Exists
        </button> */}
      </div>
    </div>
  );
}
