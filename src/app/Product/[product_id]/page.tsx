"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import  {product}  from "../../model";
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
    <div className="w-[80%] h-auto m-auto mt-30 border rounded shadow-[0px_4px_6px_rgba(0,0,0,0.2)] flex grid grid-cols-1 grid-rows-1
    sm:grid-cols-2 sm:grid-rows-1 sm:h-220">
      <div className="w-auto min-w-[80%] h-auto border p-20 m-10 shadow-2xl">
        <img className="w-auto min-w-[80%] m-auto" src={`../${data?.image_url}`}></img>
      </div>
      <div className="w-auto h-auto max-h-220 border m-10 shadow-2xl">
        <table className="m-5">
          <thead>
            <tr>
              <td className="text-sm wrap
                sm:text-4xl">{data?.product_name}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="text-2xl wrap text-red-500">{(data?.price)}đ</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-wrap p-10 mt-[90%] mb-30 justify-center
        sm:mt-120">
          <button className="border rounded-full p-2 w-30 mr-10 cursor-pointer
          sm:w-50" onClick={() => HandleAddItem()}>Add to cart</button>
          <button className="border rounded-full p-2 w-30 cursor-pointer
          sm:w-50" onClick={HandleClickReturn}>Countinue shopping</button>
        </div>
      </div>
    </div>
  )
}