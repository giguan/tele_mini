"use client"

import Image from "next/image";
import AdminLayout from "./layout";

export default function Home() {

  return (
    <div className="color-[#000000]">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Card 1</div>
        <div className="bg-white p-4 rounded shadow">Card 2</div>
        <div className="bg-white p-4 rounded shadow">Card 3</div>
        </div>
    </div>
  );
};