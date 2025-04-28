"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import  product  from "../../model";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { addItemToCart } from "@/app/Cart/AddItem";
export default function Product() {
  const router = useRouter();
  const [data, setData] = useState<product | null>(null);
  const { product_id } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/product/${product_id}`);
    if (response && response.data) {
      setData(response.data[0])
      console.log("Response Data:", response.data);
    }
    else
      console.log("Can't get I4");
    } catch (error) {
      console.log(error)
    }
  }
  const HandleAddItem = () => {
    if(data)
      addItemToCart(data);
    else
      return;
  }
  const HandleClickReturn = () => {
    if (window.history.length > 1)
      router.back();
    else
      router.push("/");
  }
  useEffect(() => {
    getData();
  }, [product_id])
  return (
    <div className="w-[80%] h-220 m-auto mt-20 border rounded shadow-[0px_4px_6px_rgba(0,0,0,0.2)] flex">
      <div className="w-150 h-200 border p-20 m-10 shadow-2xl">
        <img className="w-full" src={`../${data?.image_url}`}></img>
      </div>
      <div className="w-250 h-200 max-h-220 border m-10 shadow-2xl">
        <table className="m-5">
          <thead>
            <tr>
              <td className="text-4xl wrap">{data?.product_name}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="text-2xl wrap text-red-500">{(data?.price)}đ</td>
            </tr>
          </tbody>
        </table>
        <div className="flex p-10 mt-130 mb-30 justify-center">
          <button className="border rounded-full p-2 w-50 mr-10 cursor-pointer" onClick={() => HandleAddItem()}>Add to cart</button>
          <button className="border rounded-full p-2 w-50 cursor-pointer" onClick={HandleClickReturn}>Countinue shopping</button>
        </div>
      </div>
    </div>
  )
}