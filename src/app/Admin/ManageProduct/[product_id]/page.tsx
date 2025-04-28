"use client"

import React, { useState, useEffect } from "react"
import {product} from "../../../model"
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
    quantity : 0
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
  const HandleChangeFile = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0] != null){
      const file = e.target.value[0];
      setData((prevData) => ({
        ...prevData,
        image_url : file
      }))
    }
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="max-w-400 w-auto min-h-150 m-auto mt-20 flex justify-center">
      <div>
        <img src={`../../${data?.image_url}`} alt={data?.product_name} className="w-100"></img>
        <input type="file"></input>
      </div>
      <table className="w-200 h-auto">
        <thead></thead>
        <tbody className="w-400">
          <tr className="">
            <td className=""><label className="w-50">Tên sản phẩm: </label><input type="text" value={data?.product_name} className="w-auto"></input></td>
          </tr>
          <tr className="">
            <td className=""><label className="w-50">Mã loại: </label><input type="text" value={data?.category_id} className="w-auto"></input></td>
          </tr>
          <tr className="">
            <td><label>Số lượng tồn: </label><input type="text" value={data?.stock_quantity}></input></td>
          </tr>
          <tr className="">
            <td><label>Giá sản phẩm: </label><input type="text" value={data?.price}></input></td>
          </tr>
          <tr>
            <td><label>Mô tả: </label><textarea value={data?.description}></textarea></td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  )
}
export default DetailOfProduct
