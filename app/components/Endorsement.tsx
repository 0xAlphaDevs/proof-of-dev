import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Circle, CircleCheckIcon, Volume1Icon } from "lucide-react";
import { createEndorsementAttestation } from "@/lib/createEndorsementAttestation";

export function Endorsement({
  userAddress,
  address,
}: {
  userAddress: string;
  address: `0x${string}`;
}) {
  const [data, setData] = useState({
    skill: "",
    rating: 0,
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [isCompleted, setIsCompleted] = useState(false); // State to manage completion

  const handleSelectChange = (key: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const { skill, rating } = data;

    if (!skill || !rating) {
      alert("Skill and Rating are required fields!");
      return;
    }

    setIsLoading(true); // Start loading
    const res = await createEndorsementAttestation(
      data.skill,
      data.rating,
      data.description,
      userAddress,
      address
    );
    setIsLoading(false); // End loading

    if (res.status) {
      setIsCompleted(true); // Set completed state
    } else {
      alert("Failed to create endorsement.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Volume1Icon className="h-6 w-6 text-green-500 pr-1" /> Endorse
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Endorse User</DialogTitle>
          <DialogDescription>
            Provide details to endorse the user. Skill and rating are required.
          </DialogDescription>
        </DialogHeader>

        {/* Conditional rendering based on loading and completion state */}
        {!isLoading && !isCompleted ? (
          <div className="grid gap-4 py-4">
            {/* Skill Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skill" className="text-right">
                Skill
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("skill", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="Solidity">Solidity</SelectItem>
                  <SelectItem value="Foundry">Foundry</SelectItem>
                  <SelectItem value="Rust">Rust</SelectItem>
                  <SelectItem value="Cairo">Cairo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("rating", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={data.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="col-span-3"
              />
            </div>
          </div>
        ) : isLoading ? (
          <div className="text-center py-8">
            <p className="text-xl textx-gray-500 font-semibold">Creating endorsement...</p>
          </div>
        ) : (
          isCompleted && (
            <div className="flex flex-col gap-4 items-center justify-center text-center py-8">
              <CircleCheckIcon className="h-10 w-10 text-green-500" />
              <p className="text-sm text-green-500 font-semibold">Endorsement Completed!</p>
            </div>
          )
        )}

        <DialogFooter>
          {!isLoading && !isCompleted && (
            <Button type="button" onClick={handleSubmit}>
              Endorse User
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
