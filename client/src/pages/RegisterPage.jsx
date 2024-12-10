import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helper/uploadFile";
import axios from 'axios';
import toast from 'react-hot-toast'

export const RegisterPage = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto,setUploadPhoto]=useState("")//state management for pro_pic
  const navigate = useNavigate()//using for navigate

  //for registration form data
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  //for phofile photo
  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file)
  
    setUploadPhoto(file)

    setData((preve)=>{
      return{
        ...preve,
        profile_pic: uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto =(e)=>{
    e.preventDefault()
    e.stopPropagation()
    setUploadPhoto(null)
  }
 const handleSubmit =async(e) =>{
  e.preventDefault()
  e.stopPropagation()

const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

try {
  const response = await axios.post(URL,data)
  console.log("response is :",response);
  toast.success(response.data.message)

  if(response.data.success){
    setData({
      name: "",
      email: "",
      password: "",
      profile_pic: "",
    });

    navigate('/email')

  }
  
} catch (error) {
  toast.error(error?.response?.data?.message)
  
}
  console.log("data",data);
 }
  

 

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat App!</h3>
        <form className="grid gap-3 mt-4" onSubmit={handleSubmit}> 
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                  }
                  </p>
                  {
                    uploadPhoto?.name && (<button className="text-lg ml-2 hover:text-red-700 " onClick={handleClearUploadPhoto}>
                    <IoClose/>
                    </button>
                    )
                  }
                  
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden "
              onChange={handleUploadPhoto}
              
            />
          </div>

          <button 
          className="bg-primary text-lg px-4 py-1 hover:bg-secondery rounded mt-4 font-bold text-white leading-relaxed tracking-wide "
          >
            Register
            </button>

        </form>
        <p className="my-3 text-center">Already have an account ? <Link to={"/email"} className="hover:text-primary font-semibold">Login</Link></p>
      </div>
     
    </div>
  );
};
