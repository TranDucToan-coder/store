"use client";

import { useState, useEffect, useMemo } from "react";
import "tailwindcss";
import "./CSS/nav.css"
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ListProduct from "./Product/page";
import { MiniCart } from "./Cart/page";
import product from "./model";
import { removeItemFromCart } from "./Cart/AddItem";
import axios from "axios";
import Link from "next/link";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  arrows: true,
  infinite: true,
  autoplay: true,
  adaptiveHeight: true,
  adaptiveWidth: true,
}
export default function Home() {
  const [results, setResults] = useState("");
  const HandleChangeResults = (results: string) => {
    setResults(results);
  }
  const [showRegister, setShowRegister] = useState(false);
  const handleToggleRegister = () => {
    setShowRegister(!showRegister);
  };
  const [showLogin, setShowLogin] = useState(false);
  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const [showCart, setShowCart] = useState(false);
  const handleToggleCart = () => {
    setShowCart(!showCart);
  }
  //Cart
  const cartItems: product[] = JSON.parse(localStorage.getItem("cartKey") || "[]");
  const total = useMemo(() => {
    if (cartItems === null) {
      return 0;
    }
    else
      return cartItems.reduce((sum: number, items: any) => sum + items.price * items.quantity, 0);
  }, [cartItems]);
  const handleRemoveItem = (item: product) => {
    removeItemFromCart(item)
  }
  const scroll = () => {
    if(window.scrollY > 500){
      setShowCart(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll",scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
},[]);
  return (<>
    <Navigate
      handleToggleLogin={handleToggleLogin}
      handleToggleRegister={handleToggleRegister}
      HandleChangeResults={HandleChangeResults}
      handleToggleCart={handleToggleCart}
      results={results  }></Navigate>
    <ListProduct results={results}></ListProduct>
    {showLogin && <LoginForm setShowLogin={setShowLogin} setShowRegister={setShowRegister} />}
    {showRegister && <RegisterForm setShowRegister={setShowRegister} setShowLogin={setShowLogin}></RegisterForm>}
    {showCart && <MiniCart cartItems={cartItems} total={total} handleRemoveItem={handleRemoveItem} handleToggleCart={handleToggleCart}></MiniCart>}
  </>)
}
const Navigate = ({ HandleChangeResults, results, handleToggleLogin, handleToggleCart }: {
  HandleChangeResults: (results: string) => void;
  results: string;
  handleToggleLogin: (state: boolean) => void;
  handleToggleRegister: (state: boolean) => void;
  handleToggleCart: (state: boolean) => void;
}) => {
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username")
    window.location.reload();
  }

  const [state, setState] = useState(false);
  const subNavigate = () => {
    setState(!state);
  }
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken || "");
    setUsername(username || "")
    console.log(token);
    console.log(username)
    document.cookie
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-wrap w-full min-h-20 mb-130 items-center justify-center mt-10">
        <div className="flex items-center text-white">
          <p className="mr-5">Search: </p>
          <input
            type="text"
            className="w-200 h-13 rounded-full outline-none border border-[rgba(228, 228, 228, 0.23)] p-4 text-white"
            onChange={(e) => HandleChangeResults(e.target.value)}
            value={results}
          ></input>
        </div>
        <div className="flex w-80 flex-wrap justify-around">
          {token || username ? (
            <div>
              <div className="relative text-white cursor-pointer" onClick={() => subNavigate()}>Welcome: {username}</div>
              {state && (
                <div className="absolute top-20 w-50 min-h-20 h-auto z-100 bg-white p-5 cursor-pointer" onMouseLeave={() => subNavigate()}>
                  <Link href={'./User'}><p className="hover: scale(1.2) mb-2">Personal information</p></Link>
                  <hr className="text-gray-200"></hr>
                  <p className="mb-2 mt-2">Order</p>
                  <hr className="text-gray-200"></hr>
                  <button className="cursor-pointer mt-2" onClick={() => logOut()}>Log out</button>
                </div>
              )
              }
            </div>
          ) : (
            <p className="cursor-pointer text-white" onClick={() => { handleToggleLogin(true) }}>
              <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 16C8 18.8284 8 20.2426 8.87868 21.1213C9.75736 22 11.1716 22 14 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H14C11.1716 2 9.75736 2 8.87868 2.87868C8 3.75736 8 5.17157 8 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5" stroke="#ffffff" stroke-width="1.5"></path> 
              <path d="M6 12L15 12M15 12L12.5 14.5M15 12L12.5 9.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g>
              </svg>
            </p>
          )
          }
        </div>
        <button onClick={() => handleToggleCart(true)} className="relative cursor-pointer text-white">
        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
        </svg>
        </button>
      </div>
      <div className="flex w-[100%] justify-center flex-wrap absolute bottom-54 z-[-100] ">
        <Slider {...settings} className="w-[100%] h-20">
          <div className="">
            <img src="./bg/bg1.jpg" className="w-full h-200 m-auto brightness-50"></img>
          </div>
          <div>
            <img src="./bg/bg2.jpg" className="w-full h-200 m-auto brightness-50"></img>
          </div>
          <div>
            <img src="./bg/bg3.jpg" className="w-full h-200 m-auto brightness-50"></img>
          </div>
          <div>
            <img src="./bg/bg4.jpg" className="w-full h-200 m-auto brightness-50"></img>
          </div>
        </Slider>
      </div>
    </div>
  );
};
const LoginForm = ({ setShowLogin, setShowRegister }: {
  setShowLogin: (state: boolean) => void;
  setShowRegister: (state: boolean) => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      sessionStorage.setItem('token', response.data.accessToken);
      sessionStorage.setItem('username', response.data.user.username);
      sessionStorage.setItem('information', response.data.user.user_id);
      setError("");
      window.location.reload();
      setShowLogin(false)
    } catch (err: any) {
      setError(err.response.data.error || 'Login failed');
    }
  };
  const handleShowPassword = () => {
    setShow(!show);
  }
  return (<>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[550px] p-4 border bg-black/35 p-5 
    rounded-md shadow-[0px_4px_6px_rgba(0,0,0,0.2)] 
    backdrop-blur-md">
      <div className="text-3xl float-right p-5 cursor-pointer text-white" onClick={() => setShowLogin(false)}>X</div>
      <div className="flex justify-center text-3xl mt-20 text-white">LOGIN FORM</div>
      <div className="flex justify-center mb-10 mt-10">
        <input type="text" placeholder="Enter your email" className="w-[90%] h-[45px] border-b-2 border-solid rounded outline-none text-white"
          onChange={(e) => setUsername(e.target.value)}
          value={username}></input>
      </div>
      <div className="flex justify-center">
        <input type="password" placeholder="Enter your password" className="w-[90%] h-[45px] border-b-2 rounded outline-none text-white"
          onChange={(e) => setPassword(e.target.value)}
          value={password}></input>
      </div>
      <div className="text-white float-right p-5">Quên mật khẩu?</div>
      <div className="flex justify-center mt-20">
        <button className="flex w-[200px] h-[40px] bg-red rounded border items-center justify-center text-white cursor-pointer hover:text-red-500 transition duration-300 ease-in-out shadow-md"
          onClick={() => handleLogin()}>Log In</button>
      </div>
      {error &&
        (<p style={{ color: 'red' }}>{error}</p>)}
      <div className="flex justify-center mt-2 text-white cursor-pointer"
        onClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}>Bạn chưa có tài khoản ?</div>
    </div>
  </>)
}
const RegisterForm = ({ setShowRegister, setShowLogin }: {
  setShowRegister: (state: boolean) => void;
  setShowLogin: (state: boolean) => void
}) => {

  return (<>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[550px] p-4 border bg-black/35 p-5 
    rounded-md shadow-[0px_4px_6px_rgba(0,0,0,0.2)] 
    backdrop-blur-md">
      <div className="text-3xl float-right p-5 cursor-pointer text-white" onClick={() => setShowRegister(false)}>X</div>
      <div className="flex justify-center text-3xl mt-20 text-white">REGISTER FORM</div>
      <div className="flex justify-center mb-10 mt-10">
        <input type="text" placeholder="Enter your email" className="w-[90%] h-[45px] border-b-2 border-solid rounded outline-none text-white"></input>
      </div>
      <div className="flex justify-center">
        <input type="text" placeholder="Enter your password" className="w-[90%] h-[45px] border-b-2 rounded outline-none text-white mb-10"></input>
      </div>
      <div className="flex justify-center">
        <input type="text" placeholder="Re-enter your password" className="w-[90%] h-[45px] border-b-2 rounded outline-none text-white"></input>
      </div>
      <div className="flex justify-center mt-10">
        <button className="flex w-[200px] h-[40px] bg-red rounded border items-center justify-center text-white cursor-pointer hover:text-red-500 transition duration-300 ease-in-out shadow-md">Log In</button>
      </div>
      <div className="flex justify-center mt-2 text-white cursor-pointer"
        onClick={() => {
          setShowLogin(true);
          setShowRegister(false)
        }
        }>Bạn đã có tài khoản ?</div>
    </div>
  </>)
}
