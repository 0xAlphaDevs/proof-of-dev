"use client";

import * as React from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

interface FormData {
  username: string;
  bio: string;
  twitter: string;
  github: string;
}

export function UserDetails() {
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    bio: "",
    twitter: "",
    github: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Mint POD Identity</CardTitle>
        <CardDescription>Enter the details below to mint your POD identities.</CardDescription>
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
              <Textarea
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
  );
}
