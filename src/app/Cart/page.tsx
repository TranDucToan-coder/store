"use client"

import React, { useState, useMemo, useEffect } from "react"
import {product} from "../model"
import { removeItemFromCart } from './AddItem'
import "../CSS/nav.css"
import axios from "axios"
import Link from "next/link"
import { AddDetailOrder, AddOrder } from "../callAPI/API"

const Cart = ({ }: {
}) => {
  const [cartItems, setCartItems] = useState<product[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cartKey") || "[]");
      setCartItems(storedCart);
    }
  }, []);
  const total = useMemo(() => {
    if (cartItems == null)
      return 0;
    else {
      return cartItems.reduce((sum, items) => sum + items.price * items.quantity, 0);
    }
  }, [cartItems]);
  const handleRemoveItem = (item: product) => {
    removeItemFromCart(item);
    setCartItems(cartItems)
  }
  const handleChangeQuantity = (item: product, newQuantity: number) => {
    const findItem = cartItems.find(items => items.product_name === item.product_name)
    if (findItem) {
      const updatedCart = cartItems.map((cartItem) => (
        cartItem.product_name === item.product_name ? { ...cartItem, quantity: newQuantity } : cartItem
      ))
      if (newQuantity < 1 || newQuantity > item.stock_quantity) {
        window.alert("Invalid!")
        return;
      }
      else {
        localStorage.setItem("cartKey", JSON.stringify(updatedCart));
        setCartItems([...updatedCart])
      }
    }
  }
  return (
    <>
      <MainCart cartItems={cartItems} total={total} handleChangeQuantity={handleChangeQuantity} handleRemoveItem={handleRemoveItem}></MainCart>
    </>
  );
};

type MainCart = {
  cartItems: product[];
  total: number;
  handleChangeQuantity: (item: product, quantity: number) => void;
  handleRemoveItem: (item: product) => void;
};
const MainCart = ({ cartItems, handleChangeQuantity, handleRemoveItem, total }: MainCart
) => {
  const submit = async () => {
    if (!sessionStorage.getItem("token")) {
      window.alert("Vui lòng đăng nhập để mua hàng");
      return;
    }
    try {
      const now = new Date();
      const convertUTC = new Date(now.getTime() + (7 * 60 * 60 * 1000)).toISOString();
      const getDate = convertUTC.slice(0, 10)
      const id = sessionStorage.getItem("information");

      const order_id = await AddOrder({
        user_id: Number(id),
        order_date: getDate,
        total_amount: total,
        status: "Chưa thanh toán",
      });
        await AddDetailOrder({ order_id, cartItems })
        console.log("Order and details successfully processed!");
        localStorage.removeItem("cartKey");
        window.location.reload();
    } catch (error) {
      console.error("Error submitting order:", error);
      window.alert("Không thể gửi đơn hàng, vui lòng kiểm tra kết nối mạng.");
    }
  };
  return (
    <div className="w-[80%] min-h-200 flex justify-center mt-20 m-auto">
      {cartItems.length === 0 ? (
        <div>EMPTY CART</div>
      ) : (
        <div className="flex justify-center flex-wrap">
          <div className="w-[70%]">
            <table className="w-250">
              <thead>
                <tr className="bg-red-300">
                  <td className="w-20 p-4">ID</td>
                  <td className="w-100">Name product</td>
                  <td className="w-40">Quantity</td>
                  <td className="w-30">Price</td>
                  <td className="w-40">Sub-total</td>
                  <td>#</td>
                </tr>
              </thead>
            </table>
            {cartItems.map((product) => (
              <table className="w-300">
                <tbody>
                  <tr key={product.product_id} className="h-10">
                    <td className="w-20 p-4">{product.product_id}</td>
                    <td className="w-100">{product.product_name}</td>
                    <td className="w-40">
                      <button className="w-5 h-5 border rounded mr-2" onClick={() => handleChangeQuantity(product, product.quantity - 1)}>-</button>
                      {product.quantity}
                      <button className="w-5 h-5 border rounded ml-2" onClick={() => handleChangeQuantity(product, product.quantity + 1)}>+</button></td>
                    <td className="w-30">{product.price}</td>
                    <td className="w-40">{(product.price * product.quantity).toFixed(2)}</td>
                    <td><button onClick={() => handleRemoveItem(product)}>X</button></td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
          <div className="w-100 h-120 border rounded-2xl">
            <div className="p-10">
              <p className="text-3xl">CART TOTAL</p>
              <hr></hr>
              <div className="mt-5 text-2xl"><label>Total: </label><p className="float-end">{total.toFixed(2)}</p></div>
            </div>
            <button className="flex w-[90%] m-auto mt-55 text-xl border rounded-xl p-4 text-center cursor-pointer 
            hover:text-red-500 transition duration-300 ease-in-out shadow-md"
              onClick={() => submit()}>Thanh Toán</button>
          </div>
        </div>
      )}
    </div>
  )
}

type MiniCartProps = {
  cartItems: product[];
  total: number;
  handleToggleCart: (state: boolean) => void;
  handleRemoveItem: (item: product) => void;
};
export const MiniCart = React.memo(({ cartItems, total, handleToggleCart, handleRemoveItem }: (MiniCartProps)) => {
  return (
    <div className="absolute top-60 right-0 w-60 min-h-60 h-auto max-h-200 overflow-Y-auto overflow-auto border rounded-xl border-solid bg-white z-1000 float-right
    sm:w-150 sm:top-10 sm:right-0">
      <div className="">
        <p className="w-10 h-10 rounded-full border float-right flex justify-center items-center m-2" onClick={() => handleToggleCart(false)}>X</p>
        <p className="p-5 text-2xl text-center ml-2">CART</p>
        <hr className="w-[80%] m-auto"></hr>
        {cartItems.map(item => (
          <div key={item.product_id} className="flex justify-around p-6 items-center">
            <img src={`./${item.image_url}`} loading="lazy" className="w-[20%]"></img>
            <p className="w-30">{item.product_name}</p>
            <p className="w-1">{item.quantity}</p>
            <p className="w-10">{(item.quantity * item.price).toFixed(2)}</p>
            <button onClick={() => { handleRemoveItem(item), handleToggleCart(false) }} className="w-6 h-6 border rounded-full cursor-pointer">X</button>
          </div>
        ))}
      </div>
      <hr className="w-[80%] m-auto"></hr>
      <div className="flex mb-10 mt-10 justify-center">
        <p className="text-xl">Total: </p>
        <p className="text-xl float-right ml-60">{total.toFixed(2)}</p>
      </div>
      <div className="flex justify-center">
        <button className="w-90 h-10 mb-10 border rounded-2xl m-4 hover:text-red-500 transition duration-300 ease-in-out shadow-md"><Link href="./Cart">Tới trang thanh toán</Link></button>
      </div>
    </div>
  )
});
export default Cart