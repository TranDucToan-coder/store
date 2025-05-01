"use client"

import React, { useState, useEffect } from "react"
import { product } from "../../../model"
import { useParams } from "next/navigation"
import axios from "axios"
const DetailOfProduct = () => {
  const [data, setData] = useState<product>({
    product_id: 0,
    product_name: "",
    category_id: 0,
    stock_quantity: 0,
    price: 0,
    description: "",
    image_url: "",
    quantity: 0
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
      setData((prevData) => ({
        ...prevData,
        image_url: file.toString()
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
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="max-w-400 w-auto min-h-150 m-auto mt-20 flex justify-center">
      <div>
        <img src={`../../${data?.image_url}`} alt={data?.product_name} className="w-100"></img>
        <input type="file" onChange={(e) => HandleChangeFile(e)}></input>
      </div>
      <table className="w-200 h-auto">
        <thead></thead>
        <tbody className="">
          <tr className="">
            <td className=""><label className="">Tên sản phẩm: </label><input type="text" value={data?.product_name} onChange={(e) => HandleChangeNameProduct(e)} className="min-w-200 max-w-250 p-4"></input></td>
          </tr>
          <tr className="">
            <td className=""><label className="w-50">Mã loại: </label><input type="number" value={data?.category_id} onChange={(e) => HandleChangeCategoryId(e)} className="min-w-5 max-w-20 p-2"></input></td>
          </tr>
          <tr className="">
            <td><label>Số lượng tồn: </label><input type="number" value={data?.stock_quantity} onChange={(e) => HandleChangeStockQuantity(e)} className="min-w-50 max-w-80 p-2"></input></td>
          </tr>
          <tr className="">
            <td><label>Giá sản phẩm: </label><input type="text" value={data?.price} onChange={(e) => HandleChangePrice(e)} className="min-w-50 max-w-70 p-2"></input></td>
          </tr>
          <tr>
            <td><label>Mô tả: </label><textarea className="min-w-200 max-w-250 min-h-30" value={data?.description} onChange={(e) => HandleChangeDes(e)}></textarea></td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  )
}
export default DetailOfProduct
