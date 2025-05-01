export interface categories {
    category_id : number,
    category_name : string,
}
export interface product {
  product_id: number,
  product_name: string,
  price: number,
  image_url: string,
  category_id : number,
  description : string,
  stock_quantity : number,
  quantity: number,
}
export interface user{
  user_id : number,
  username : string,
  password: string,
  email: string,
  phone: number,
  address: string,
  role: string
}
export interface order {
  order_id : number,
  user_id : number,
  order_date : string,
  total_amount : number,
  status : string
}
export interface orderDetail {
  order_detail_id : number,
  order_id : number,
  product_name: string,
  product_id : number,
  quantity: number,
  price : number,
  image_url : string
}
