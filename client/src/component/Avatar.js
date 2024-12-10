import React from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  let avatarName = "";
  if (name) {
    const splitName = name.split(" "); // Splitting the name by spaces
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0]; // First letters of the first and second name
    } else {
      avatarName = splitName[0][0]; // First letter of the only name
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    "bg-slate-700",
    "bg-slate-800",
    "bg-slate-900",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
    "bg-zinc-100",
    "bg-zinc-200",
    "bg-zinc-300",
  ];
  const randomNumber = Math.floor(Math.random() * 15);

  const isOnline = onlineUser.includes(userId);

  return (
    <div
      className={`text-slate-800  rounded-full  text-xl font-bold relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          // width={width}
          // height={height}
          alt={name}
          className="overflow-hidden rounded-full object-cover w-full h-full"
          style={{ objectPosition: "center top" }}  // Adjust image position here
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <FaUser size={width} />
      )}
      {isOnline && <div className="bg-green-600 p-1.5 absolute bottom-2 -right-1 z-10 rounded-full"></div>}
    </div>
  );
};

export default Avatar;
