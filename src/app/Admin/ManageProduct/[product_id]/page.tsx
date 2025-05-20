"use client"

import React, { useState, useEffect } from "react"
import { product } from "../../../model"
import { useParams } from "next/navigation"
import axios from "axios"
import { updateProduct } from "@/app/callAPI/API"

const DetailOfProduct = () => {
  const [data, setData] = useState<product>({
    product_id: 0,
    product_name: "",
    category_id: 0,
    stock_quantity: 0,
    price: 0,
    description: "",
    image_url: "",
  });
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
  const HandleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] != null) {
      const file = e.target.files[0];
      const filename = file.name
      setData((prevData) => ({
        ...prevData,
        image_url: filename
      }))
    }
  }
  const HandleChangeNameProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, product_name: value });
  }
  const HandleChangeCategoryId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, category_id: Number(value) })
  }
  const HandleChangeStockQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) > 0)
      setData({ ...data, stock_quantity: Number(value) });
    else {
      alert("Số lượng tồn không thể < 0");
      return;
    }
  }
  const HandleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(!Number(value)){
      window.alert("Giá tiền mới không thể < 0");
      return;
    }
    if (Number(value) > 0)
      setData({ ...data, price: Number(value) })
    else {
      window.alert("Giá tiền mới không thể < 0");
      return;
    }
  }
  const HandleChangeDes = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setData({...data, description : value})
  }
  const Submit = async() => {
    try {
      const response = await updateProduct({
        product_name: data.product_name,
        category_id: data.category_id,
        stock_quantity: data.stock_quantity,
        price: data.price,
        description: data.description,
        image_url: data.description,
        product_id: data.product_id as number
    })
    if(response){
      window.alert(`Thay đổi sản phẩm ${data.product_name} thành công`);
      console.log(data)
    }
    else
      window.alert(`Cập nhập sản phẩm thất bại`)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="w-full min-h-150 m-auto mt-20 flex justify-center flex-wrap p-2
    sm:max-w-400 w-20 min-h-150 sm:p-0">
      <div className="w-auto flex flex-wrap justify-center">
        <img src={`./../../../${data?.image_url}`} alt={data?.product_name} className="w-80
        sm:w-100"></img>
        <input type="file" onChange={(e) => HandleChangeFile(e)}></input>
      </div>
      <div className="grid grid-cols-1 grid-row-1 gap-5">
        <div className="flex items-center justify-between"><label className="">Tên sản phẩm: </label><input type="text" value={data?.product_name} onChange={(e) => HandleChangeNameProduct(e)} 
        className="p-2 ml-2 border outline-none rounded-xl
        focus:border-red-300 focus:transition-all focus:duration-200
        sm:min-w-200 max-w-250 "></input></div>
        <div className="flex items-center justify-between"><label className="w-50">Mã loại: </label><input type="number" value={data?.category_id} onChange={(e) => HandleChangeCategoryId(e)} 
        className=" p-2 border outline-none rounded-xl
        focus:border-red-300 focus:transition-all focus:duration-200
        sm:min-w-200 max-w-250"></input></div>
        <div className="flex items-center justify-between"><label>Số lượng tồn: </label><input type="text" value={data?.stock_quantity} onChange={(e) => HandleChangeStockQuantity(e)} 
        className=" p-2 border outline-none rounded-xl
        focus:border-red-300 focus:transition-all focus:duration-200
        sm:min-w-200 max-w-250"></input></div>
        <div className="flex items-center justify-between"><label>Giá sản phẩm: </label><input type="text" value={data?.price} onChange={(e) => HandleChangePrice(e)} 
        className="p-2 border outline-none rounded-xl
        focus:border-red-300 focus:transition-all focus:duration-200
        sm:min-w-200 max-w-250 "></input></div>
        <div className="flex items-center justify-between"><label>Mô tả: </label><textarea className=" min-h-30 p-2 border outline-none rounded-xl
        focus:border-red-300 focus:transition-all focus:duration-200
        sm:min-w-200 max-w-250" value={data?.description} onChange={(e) => HandleChangeDes(e)}></textarea></div>
        <button className="w-10 h-10 border rounded-sm hover:border-red-400 hover:text-red-400 hover:duration-500 hover:transition-all
        sm:w-50" onClick={() => Submit()}>Submit</button>
      </div>
    </div>
  )
}
export default DetailOfProduct
