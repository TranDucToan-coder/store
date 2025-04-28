"use client"

import { useState, useEffect } from "react"
import { product } from "../../model"
import { getProduct } from "@/app/callAPI/API"
import Pagination from "@/app/paginate"
import Paginated from "@/app/usePagination"
import Link from "next/link"

const ManageProduct = ({ item }: { item: product[] }) => {
    const [data, setData] = useState<product[]>([]);
    const [page, setPage] = useState(1);
    const limit = 9;

    const getData = async () => {
        const response = await getProduct();
        setData(response);
    }
    const {paginated, totalPages} = Paginated({page, limit, data});
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="max-w-400 w-auto min-h-150 m-auto mt-20 flex justify-center">
            <table className="max-w-500">
                <thead className="border">
                    <tr className="text-center h-20 text-xl text-yellow-400">
                        <td>Name</td>
                        <td>Price</td>
                        <td>Image</td>
                        <td>#</td>
                    </tr>
                </thead>
                {
                    paginated.map((item) => (
                        <tbody className="border">
                            <tr key={item.product_id}>
                                <td className="min-w-150 w-auto p-10">{item.product_name}</td>
                                <td className="w-30 p-10">{item.price}</td>
                                <td className="w-50 p-10"><img src={`../../${item.image_url}`} className="w-50"></img></td>
                                <td className="w-20 p-10"><Link href={`./ManageProduct/${item.product_id}`}><button>Detail</button></Link></td>
                            </tr>
                        </tbody>
                    ))
                }
                <tfoot>
                    <tr>
                        <td colSpan={4}><Pagination page={page} setPage={setPage} totalPages={totalPages}></Pagination></td>
                    </tr>
                </tfoot>
            </table>
            
        </div>
    )
}
export default ManageProduct
