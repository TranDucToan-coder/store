"use client"
import { useState } from 'react';
import {cartItem} from '../model'

export const addItemToCart = (item: cartItem) => {
  const currentCart: cartItem[] = JSON.parse(localStorage.getItem("cartKey") || "[]");
  const existProduct = currentCart.find(
    (cartItem) => cartItem.product_id === item.product_id
  );
  if (existProduct) {
    console.log("Product already exists in the cart");
    if(existProduct.stock_quantity > 0)
    {
      existProduct.quantity += 1;
      localStorage.setItem("cartKey", JSON.stringify(currentCart));
      return currentCart;
    }
    else
    {
      console.log("Số lượng hàng tồn không đủ")
      existProduct.quantity = 1;
      return currentCart;
    }
  } else {
    const newItem = { ...item, quantity: 1 };
    const updatedCart = [...currentCart, newItem];
    localStorage.setItem("cartKey", JSON.stringify(updatedCart));
    console.log("Added to cart:", updatedCart);
    return updatedCart;
  }
};
export const removeItemFromCart = (item : cartItem) => {
    const currentCart: cartItem[] = JSON.parse(localStorage.getItem("cartKey") || "[]");
    const existProduct = currentCart.filter((cartItems) => cartItems.product_id !== item.product_id)
    if(existProduct)
    {
      return localStorage.setItem("cartKey", JSON.stringify(existProduct));
    }
    else
    {
      return currentCart;
    }
}
