"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {user} from "../model"
import {order} from "../model"
import {orderDetail} from "../model"
import Link from "next/link";
import { getDetailOrder, getOrderOfUser, getUser } from "../callAPI/API"

const Profile = ({ }) => {
    const router = useRouter();
    const [data, setData] = useState<user | null>(null);
    const [activeSection, setActiveSection] = useState<"information" | "history">("information");
    const getData = async () => {
        const username = typeof window !== 'undefined' && sessionStorage.getItem("username");
        if (!username) return;
        try {
            const value = await getOrderOfUser({ username })
            setData(value);
        } catch (err: any) {
            console.error("Error fetching user details:", err.message);
        }
    };
    const token = JSON.stringify(sessionStorage.getItem("token"));
    const role = sessionStorage.getItem("role");
    useEffect(() => {
            getData();
    }, []);
    return (
        token ? (
            <div className="w-[80%] min-h-200 m-auto pt-10 flex flex-wrap justify-center">
        <section>
            <div className="w-50 min-h-60 rounded-sm shadow-2xl mr-10">
                <p className="not-active:text-red p-5" onClick={() => setActiveSection("information")}><Link href={"./User"}>Thông tin cá nhân</Link></p>
                <hr className="w-[80%] m-auto text-gray-200"></hr>
                <p className="p-5" onClick={() => setActiveSection("history")}><Link href={"./User"}>Lịch sử mua hàng</Link></p>
                <hr className="w-[80%] m-auto text-gray-200"></hr>
            </div>
        </section>
        <section>
            {activeSection === "information" ? (<Information data={data}></Information>) : (<History></History>)}
        </section>
    </div>
        ) : (<>Please login when coming here</>)
    );

}
export default Profile

const History = ({ }: {}) => {
    const [data, setData] = useState<order[]>([]);
    const getData = async () => {
        const username = typeof window !== 'undefined' ? sessionStorage.getItem("*") : null;
        if (username) {
            const value = await getUser({ username })
            setData(value);
        }
        else
            return null;
    }
    const [toggle, setToggle] = useState(false);
    const [detail, setDetail] = useState<orderDetail[]>([]);
    const handleChangeStatus = async (order_id: number) => {
        try {
            const response = await getDetailOrder(order_id);
            if (response && response.length > 0) {
                setDetail(response);
                setToggle(!toggle);
            } else {
                window.alert("Lỗi khi lấy danh sách chi tiết đơn hàng")
                return;
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };
    useEffect(() => {
        getData();
    }, [])
    return (
        <section>
            <table className="w-auto min-h-60 m-auto rounded-sm shadow-2xl">
                <thead>
                    <tr className="p-4">
                        <td className="w-20 p-4">ID</td>
                        <td className="w-50">Date</td>
                        <td className="w-40">Amount</td>
                        <td className="w-60">Status</td>
                        <td className="w-30"></td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value) => (
                        <tr key={value.order_id} className="">
                            <td className="p-4">{value.order_id}</td>
                            <td>{value.order_date ? (value.order_date).slice(0, 10) : "No data"}</td>
                            <td>{value.total_amount}</td>
                            <td>{value.status}</td>
                            <td><button onClick={() => handleChangeStatus(value.order_id)} className="cursor-pointer w-auto h-10 ">Detail</button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
            {toggle && (
                <table className="w-auto m-auto mt-10 ">
                    <thead></thead>
                    <tbody>
                        {detail.map((value) => (
                            <tr key={value.order_detail_id} className="flex items-center w-auto">
                                <td className="w-100 flex flex-wrap p-5">{value.product_name}</td>
                                <td className="w-50">{value.price}</td>
                                <td><img className="w-30" src={`./${value.image_url}`}></img></td>
                            </tr>
                        ))
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
            )}
        </section>
    )
}
const Information = ({ data }: {
    data: user | null
}) => {
    return (
        <section className="">
            <table className="w-auto min-h-60 m-auto rounded-sm shadow-2xl">
                <thead></thead>
                <tbody>
                    <tr>
                        <td colSpan={2} className="text-2xl p-5">Thông tin tài khoản</td>
                    </tr>
                    <tr>
                        <td className="w-30 h-20 p-5">Họ và tên: </td>
                        <td className="pr-5"><input className="w-100 h-10 p-4 outline-none border rounded-xl" type="text" value={data?.username}></input></td>
                    </tr>
                    <tr>
                        <td className="w-30 h-20 p-5">Email: </td>
                        <td><input className="w-100 h-10 p-4 outline-none border rounded-xl" type="text" value={data?.email}></input></td>
                    </tr>
                    <tr>
                        <td className="w-30 h-20 p-5">Số điện thoại: </td>
                        <td><input className="w-100 h-10 p-4 outline-none border rounded-xl" type="text" value={data?.phone}></input></td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
        </section>
    )
}

