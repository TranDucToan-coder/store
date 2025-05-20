"use client"

import { useState, useEffect } from "react"
import { product } from "../../model"
import { getProduct } from "@/app/callAPI/API"
import Pagination from "@/app/paginate"
import Paginated from "@/app/usePagination"
import Link from "next/link"

const ManageProduct = ({}: {}) => {
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
        <div className="w-100 min-h-150 m-auto mt-20 overflow-x-auto
        sm:max-w-[80%] sm:w-full sm:m-auto">
            <Link href="./NewData/NewProduct"><div className="m-auto">Thêm sản phẩm</div></Link>
            <table className="w-20 m-auto mt-20">
                <thead className="border">
                    <tr className="text-center h-20 text-xl text-yellow-400">
                        <td>Name</td>
                        <td>Price</td>
                        <td>Image</td>
                        <td>#</td>
                    </tr>
                </thead>
                {
                    paginated?.map((item) => (
                        <tbody className="border">
                            <tr key={item.product_id}>
                                <td className="w-20 p-10
                                sm:min-w-150 w-auto p-10">{item.product_name}</td>
                                <td className="w-30 p-10">{item.price}</td>
                                <td className="w-80 p-10"><img src={`./../../../${item.image_url}`} alt="none" className="w-30"></img></td>
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
