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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Volume1Icon } from "lucide-react";

export function Endorsement() {
  const [data, setData] = useState({
    skill: "",
    rating: "",
    description: "",
  });

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

  const handleSubmit = () => {
    const { skill, rating } = data;

    if (!skill || !rating) {
      alert("Skill and Rating are required fields!");
      return;
    }

    console.log(data);
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
        <div className="grid gap-4 py-4">
          {/* Skill Select */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skill" className="text-right">
              Skill
            </Label>
            <Select onValueChange={(value) => handleSelectChange("skill", value)}>
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
            <Select onValueChange={(value) => handleSelectChange("rating", value)}>
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
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Endorse User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
