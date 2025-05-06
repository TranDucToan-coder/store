"use client"
import { useState, useEffect } from "react"
import {user} from "../../model"
import { getCustomer, getEmployee } from "@/app/callAPI/API"
import Link from "next/link"

const ManageEmployee = () => {
    const [data, setData] = useState<user[]>([]);
    const getData = async () => {
        const response = await getCustomer();
        try {
            if (response != null) {
                console.log(response)
                setData(response);
            }
            else
                console.log("Can't get in4");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="min-w-[300px] max-w-400 min-h-200 m-auto mt-10 overflow-x-auto">
            <Link href="./NewData/NewCustomer"><div>Thêm khách hàng</div></Link>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="">
                    <tr className="">
                        <td className="p-4">Id</td>
                        <td className="p-4">Username</td>
                        <td className="p-4">Phone</td>
                        <td className="p-4">#</td>
                    </tr>
                </thead>
                {data.map((value, index) => (<tbody key={value.user_id}>
                    <tr >
                        <td className="p-4">{value.user_id}</td>
                        <td className="p-4">{value.username}</td>
                        <td className="p-4">{value.phone}</td>
                        <td className="p-4"><Link href={`./ManageEmployee/${value.username}`}>Detail</Link></td>
                    </tr>
                </tbody>))}
                <tfoot></tfoot>
            </table>
        </div>
    )
}
export default ManageEmployee