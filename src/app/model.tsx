export default interface categories {
    category_id : number,
    category_name : string,
}
export default interface product {
  product_id: number,
  product_name: string,
  price: number,
  image_url: string,
  category_id : number,
  description : string,
  stock_quantity : number,
  quantity: number,
}
export default interface user{
  user_id : number,
  username : string,
  password: string,
  email: string,
  phone: number,
  address: string,
  role: string
}