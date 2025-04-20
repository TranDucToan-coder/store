"use client"

import Link from "next/link";


const ErrorPage = () => {
    return(
        <div className="min-h-200 w-[80%] m-auto pt-10">
            <div className="flex justify-center">
            <img className="w-[50%] "
             src={`https://th.bing.com/th/id/R.a8cfb28129d45bfcb1d8b54bb79db6f5?rik=Q0dQ9fX6grLVuA&riu=http%3a%2f%2flinhkiencuvn.com%2fImages%2fbook404_06.png&ehk=PXgYFrSyQYhs6CICru%2fYpNpzTC1o0jJS8qhhHjsv0VY%3d&risl=&pid=ImgRaw&r=0`}></img>
            </div>
            <p className="w-auto m-auto text-center p-4">Rất tiếc trang bạn tìm kiếm đang không tồn tại</p>
            <p className="w-100 h-10 p-2 m-auto text-center border rounded-sm text-m hover:transition-all hover:duration-200 hover:bg-red-200"> <Link href={"./"}>Quay lại trang chủ</Link></p>
        </div>
    )
}
export default ErrorPage