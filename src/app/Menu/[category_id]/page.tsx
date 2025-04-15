"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import product from '../../model'
import { useParams } from "next/navigation"
import Link from "next/link"

import Paginated from "@/app/usePagination"
import Pagination from "@/app/paginate"
import { addItemToCart } from "@/app/Cart/AddItem"

const instance = axios.create({
    baseURL: "http://localhost:3001/categories",
    timeout: 3000,
    headers: {
        "Authorization": "Bearer token"
    }
})
const DetailOfCategory = () => {
    const {category_id} = useParams();
    const [data, setData] = useState<product[]>([]);
    const [page, setPage] = useState(1);
    const limit = 9;
    const {paginated, totalPages} = Paginated({page, limit, data});

    const getData = async () => {
        const response = await instance.get(`/${category_id}`);
        if (response && response.data) {
            const results = response.data;
            setData(results);
        }
        else
            console.log("Can't get data");
    }
    const handleAddItem = (item : product) => {
        if(data)
            addItemToCart(item);
        else
            return;
    }
    useEffect(() => {
        getData();
    }, [category_id])
    return (
        <div className="">
          <div className="flex w-330 h-auto min-h-100 flex-wrap m-auto mt-20 mb-20">
            {
              data.map((product) => (
                <div key={product.product_id} className="w-100 h-145 border rounded-md mt-10 mr-10">
                  <div className="w-[80%] h-[60%] p-5 m-auto mt-5 shadow-2 overflow-hidden">
                    <img src={`../` + product.image_url} alt="none" className="w-[80%] max-w-60 scale-100 ml-10 hover:transition-all hover:scale-120 hover:overflow-none"></img>
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
export default DetailOfCategory