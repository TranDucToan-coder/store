"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import "tailwindcss";
import "../CSS/nav.css"
import categories from "../model";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/navigation";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 3000,
  headers: {
    "Authorization": "Bearer token"
  }
})
export default function Menu() {
  const [data, setData] = useState<categories[]>([]);
  const router = useRouter();
  const getData = async () => {
    try {
      const response = await instance.get('/categories');
      const results = response.data;
      setData(results);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setData([]);
    }
  };
  const ReturnHome = () => {
    router.push("/");
  }
  useEffect(() => {
    getData();

  }, [])
  return (
    <>
      <div className="w-full min-h-20 h-auto p-3 flex m-auto justify-around flex-wrap text-center items-center sticky bg-black/40 backdrop-blur-md sticky top-2 z-1000">
        <div>
          <Image
            src="/images/Logo.png"
            width={150}
            height={150}
            alt="logo"
            onClick={ReturnHome}
            className="cursor-pointer"></Image>
        </div>
        {data && data.length > 0 ? (
          data.map((category, index) => (
            <ul key={category.category_id} className="relative">
              <li className="item cursor-pointer p-4 text-white"><Link href={`/Menu/${category.category_id}`}>{category.category_name}</Link></li>
            </ul>
          ))
        ) : (
          <p className="flex justify-center">Loading or no data available</p>
        )
        }
      </div></>
  )
}
