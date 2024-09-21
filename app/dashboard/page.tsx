"use client";
import React, { useEffect } from "react";
import { UserDetails } from "@/app/components/dashboard/UserDetails";

const Dashboard = () => {
  useEffect(() => {
    const data = localStorage.getItem("pod-identity");
    if (data) {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
    }
  }, []);
  return (
    <div>
      <div>
        <UserDetails />
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
