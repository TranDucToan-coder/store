"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import product from '../model'
import Pagination from "../paginate";
import Paginated from "../usePagination";
import { addItemToCart } from "../Cart/AddItem";

const ListProduct = ({ results }: { results: string }) => {
  const [data, setData] = useState<product[]>([]);
  const [page, setPage] = useState(1);
  const limit = 9;
  const { totalPages, paginated } = Paginated({ page, limit, data })
  const getData = async () => {
    const response = await axios.get("http://localhost:3001/product");
    if (response) {
      setData(response.data);
    }
    else {
      console.log("Can't get data");
    }
  }
  useEffect(() => {
    getData();
  }, [results])
  const FilteredData = (results || "").trim()
    ? paginated.filter(a => {
      if (!a.product_name) {
        console.warn("Missing product_name in item:", a);
        return false;
      }
      return a.product_name.toLowerCase().includes(results.toLowerCase());
    })
    : paginated;
const handleAddItem = (item : product) => {
  addItemToCart(item)
}
return (
  <div className="">
    <div className="flex w-330 h-auto min-h-100 flex-wrap m-auto justify-between mt-10 mb-20">
      {
        FilteredData.map((product) => (
          <div key={product.product_id} className="w-100 h-145 border rounded-md mt-10">
            <div className="w-[80%] h-[60%] p-5 m-auto mt-5 shadow-2 overflow-hidden">
              <img src={`./` + product.image_url} alt="none" className="w-[80%] max-w-60 scale-100 ml-10 hover:transition-all hover:scale-120 hover:overflow-none"></img>
            </div>
            <div className="pl-5 text-xl">{product.product_name || "none"}</div>
            <div className="p-5">{product.price || "none"}</div>
            <div className="w-[100%] flex justify-around mt-5">
              <Link href={`/Product/${product.product_id}`}><button className="w-30 h-auto p-2 rounded-full border border-solid outline-none cursor-pointer hover:border-red-500 transition duration-300 ease-in-out">Detail</button></Link>
              <button className="w-30 h-auto p-2 rounded-full border border-solid outline-none cursor-pointer hover:border-red-500 transition duration-300 ease-in-out" onClick={() => handleAddItem(product)}>Add cart</button>
            </div>
          </div>
        ))
      }
    </div>
    {
      page !== null ? (
        <Pagination page={page} totalPages={totalPages} setPage={setPage}></Pagination>
      ) : (
        <div></div>
      )
    }
  </div>);
}
export default ListProduct