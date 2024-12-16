import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, setUser,setOnlineUser, setSocketConnection } from "../redux/userSlice";
import Sidebar from "../component/Sidebar";
import logo from '../assets/Logo.png'
import io from "socket.io-client"
import toast from "react-hot-toast";

export const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response?.data?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }

    } catch (error) {
      toast.error(error?.response?.data?.data?.message)
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  /*
  SOCKECT CONNECTION
  */ 
 useEffect(()=>{
  const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
    auth: {
      token : localStorage.getItem('token')
    }
  })

//geting all online user from backend
socketConnection.on('onlineUser',(data)=>{

  dispatch(setOnlineUser(data))
})

dispatch(setSocketConnection(socketConnection))

  return ()=>{
    socketConnection.disconnect()
  }
 },[])

  const basePath = location.pathname == '/'
   
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden" } lg:block`}>
        <Sidebar />
      </section>

      {/*message component*/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className={` justify-center items-center flex-col gap-2 hidden ${!basePath ?"hidden" :  "lg:flex"}`}>
        <div>
          <img
          src={logo}
          width={250}
          alt="logo"
         
          />
        </div>
        <p className="text-lg mt-2 text-slate-500">Select user to sent message</p>
      </div>

    </div>
  );
};
