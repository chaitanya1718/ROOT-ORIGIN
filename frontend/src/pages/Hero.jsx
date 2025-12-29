import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coconut from "../assets/coconut.png";
import juice from "../assets/juice.png";
import milkBig from "../assets/milkBig.png";
import sweetbg from "../assets/sweetBig.png";
import icebg from "../assets/icecreamBig.png";
import laysbg from "../assets/laysBig.png";
import { Link } from "react-router-dom";
import milksm from "../assets/milksm.png";
import sweetsm from "../assets/sweetsm.png";
import laysm from "../assets/layssm.png";
import icesm from "../assets/icesm.png";
import DefaultHeader from "../components/DefaultHeader";


import rakesh from "../assets/rakesh.jpg";
import deepak from "../assets/deepak.jpeg";

import { FaFacebook } from "react-icons/fa";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaVanShuttle } from "react-icons/fa6";
import { TbBottleFilled } from "react-icons/tb";
import { IoIceCreamSharp } from "react-icons/io5";
import logo from "../assets/logo.png";

import "./Hero.css";

const categories = {
  milk: {
    title: "Milk",
    bgText: "milk",
    image: `${milkBig}`,
    color: "#E8EEF1",
  },
  iceCreams: {
    title: "Ice Creams",
    bgText: "Ice creams",
    image: `${icebg}`,
    color: "#EFE7DD",
  },

  coffee: {
    title: "Snacks",
    bgText: "Snacks",
    image: `${laysbg}`,
    color: "#EFE7DD",
  },
  juice: {
    title: "Sweets",
    bgText: "Sweets",
    image: `${sweetbg}`,
    color: "#FFF3E0",
  },
};

const bgAssets = {
  milk: [
    {
      id: 1,
      src: `${milksm}`,
      x: -200,
      y: -150,
      size: 120,
      depth: 0.2,
      opacity: 0.25,
    },
    {
      id: 2,
      src: `${milksm}`,
      x: 200,
      y: -80,
      size: 110,
      depth: 0.4,
      opacity: 0.3,
    },
    {
      id: 3,
      src: `${milksm}`,
      x: -180,
      y: 50,
      size: 80,
      depth: 0.3,
      opacity: 0.3,
    },
  ],
  juice: [
    {
      id: 1,
      src: `${sweetsm}`,
      x: -150,
      y: -100,
      size: 130,
      depth: 0.3,
      opacity: 0.3,
    },
    {
      id: 2,
      src: `${sweetsm}`,
      x: 200,
      y: -50,
      size: 80,
      depth: 0.5,
      opacity: 0.25,
    },
    {
      id: 3,
      src: `${sweetsm}`,
      x: -180,
      y: 50,
      size: 80,
      depth: 0.3,
      opacity: 0.3,
    },
  ],
  coffee: [
    {
      id: 1,
      src: `${laysm}`,
      x: -200,
      y: -80,
      size: 120,
      depth: 0.2,
      opacity: 0.25,
    },
    {
      id: 2,
      src: `${laysm}`,
      x: 260,
      y: -80,
      size: 90,
      depth: 0.4,
      opacity: 0.3,
    },
    {
      id: 3,
      src: `${laysm}`,
      x: 200,
      y: 80,
      size: 90,
      depth: 0.4,
      opacity: 0.3,
    },
  ],
  iceCreams: [
    {
      id: 1,
      src: `${icesm}`,
      x: -200,
      y: -80,
      size: 120,
      depth: 0.2,
      opacity: 0.25,
    },
    {
      id: 2,
      src: `${icesm}`,
      x: 260,
      y: -80,
      size: 90,
      depth: 0.4,
      opacity: 0.3,
    },
    {
      id: 3,
      src: `${icesm}`,
      x: 200,
      y: 80,
      size: 110,
      depth: 0.4,
      opacity: 0.3,
    },
  ],
};

const feedbacks = [
  {
    id: 1,
    name: "Sumanth",
    photo:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    rating: 4,
    message: "Excellent quality and very fresh products. Highly recommended!",
  },
  {
    id: 2,
    name: "Vinay",
    photo:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    rating: 4,
    message: "Fast delivery and great packaging. Will order again.",
  },
  {
    id: 3,
    name: "Chandu",
    photo:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    rating: 3,
    message: "Milk quality is top notch. Loved the service!",
  },
  {
    id: 4,
    name: "Rakesh",
    photo:
     `${rakesh}`,
    rating: 4,
    message: "Very smooth experience and great customer support.",
  },
  {
    id: 5,
    name: "Deepak",
    photo:
     `${deepak}`,
    rating: 5,
    message: "I love Kaju Katli, the quality is awesome.",
  },
];

export default function Hero() {
  const [active, setActive] = useState("milk");
  const data = categories[active];

  useEffect(() => {
    const categoryKeys = Object.keys(categories);
    let index = categoryKeys.indexOf(active);

    const interval = setInterval(() => {
      index = (index + 1) % categoryKeys.length;
      setActive(categoryKeys[index]);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div>
      <DefaultHeader />
      <div
        style={{ background: data.color }}
        className="h-screen w-full overflow-hidden relative flex items-center justify-center"
      >
        {/* Background Text */}
        <motion.h1
          key={data.bgText}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 0.08 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute text-[25vw] font-bold uppercase pointer-events-none"
        >
          {data.bgText}
        </motion.h1>

        <AnimatePresence>
          {bgAssets[active].map((el) => (
            <motion.img
              key={`${active}-${el.id}`}
              src={el.src}
              initial={{ opacity: 0, x: el.x, y: el.y, scale: 0.9 }}
              animate={{ opacity: el.opacity, x: el.x, y: el.y, scale: 1 }}
              exit={{ opacity: 0, x: el.x - 80, scale: 0.9 }}
              transition={{ duration: 0.9, delay: el.depth, ease: "easeInOut" }}
              className="absolute pointer-events-none select-none bg-transparent "
              style={{ width: el.size }}
              alt=""
              draggable={false}
            />
          ))}
        </AnimatePresence>

        {/* Product Image */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={data.image}
              src={data.image}
              initial={{ x: 100, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-80 h-80 object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="absolute bottom-30 flex gap-4 z-20">
          <Link to="/register">
           <button
  className="
    relative overflow-hidden
    text-white
    bg-linear-to-tr from-cyan-800 to-teal-400
    px-4 py-2 rounded-2xl
    text-cyan-800
    transition-transform duration-300 ease-in-out
    hover:scale-110 hover:text-white
    shine-btn
  "
>
  Get started
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-3xl border-b-2 border-b-cyan-800 px-4">
          Our Services
        </h1>
      </div>

      <div className="features flex justify-around items-center py-8 flex-wrap gap-6">
        {/* Service 1 */}
        <div className="service-card bg-cyan-300 w-80 h-60 rounded-xl p-5 flex flex-col items-center text-center">
          <span className="text-5xl">
            <TbBottleFilled />
          </span>
          <h3 className="text-xl font-semibold mt-3">Fresh Dairy Delivery</h3>
          <p className="text-sm mt-2 text-cyan-900">
            Milk and curd delivered daily to your doorstep with guaranteed
            freshness.
          </p>
        </div>

        {/* Service 2 */}
        <div className="service-card bg-cyan-300 w-80 h-60 rounded-xl p-5 flex flex-col items-center text-center">
          <span className="text-5xl">
            <IoIceCreamSharp />
          </span>
          <h3 className="text-xl font-semibold mt-3">Premium Ice Creams</h3>
          <p className="text-sm mt-2 text-cyan-900">
            Indulge in rich, creamy ice creams made from pure dairy and natural
            ingredients.
          </p>
        </div>

        {/* Service 3 */}
        <div className="service-card bg-cyan-300 w-80 h-60 rounded-xl p-5 flex flex-col items-center text-center">
          <span className="text-5xl">
            <FaVanShuttle />
          </span>
          <h3 className="text-xl font-semibold mt-3">
            Daily Subscription Plans
          </h3>
          <p className="text-sm mt-2 text-cyan-900">
            Subscribe once and receive fresh nutrition essentials every day,
            hassle-free.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <h1 className="text-3xl border-b-2 border-b-cyan-800 px-4 mb-8">
          Hear from our customers
        </h1>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-sec py-2">
          {[...feedbacks, ...feedbacks].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="feedback-card bg-white w-72 min-h-[280px] rounded-xl p-4 flex flex-col items-center text-center shrink-0 shadow-md"
            >
              {/* Avatar */}
              <img
                src={item.photo}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />

              {/* Name */}
              <h3 className="mt-3 font-semibold text-lg">{item.name}</h3>

              {/* Rating */}
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < item.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Feedback */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="footer mt-8 min-h-[50vh] bg-cyan-950 text-white py-4">
        <div className=" flex justify-around">
          <div>
            <h1 className="text-2xl  border-b border-b-white pr-2">
              {" "}
              Quick links
            </h1>
            <ul className="flex flex-col gap-2">
              <li className="hover:text-cyan-300 cursor-pointer">Home</li>
              <Link to="/login">
                <li className="hover:text-cyan-300 cursor-pointer">Login</li>
              </Link>
              <Link to="/register">
                <li className="hover:text-cyan-300 cursor-pointer">Signup</li>
              </Link>
              <Link to="/about">
                <li className="hover:text-cyan-300 cursor-pointer">About</li>
              </Link>
            </ul>
          </div>
          <div></div>
          <div>
            <h1 className="text-2xl border-b border-b-white pr-2">
              {" "}
              Social media
            </h1>
            <div className="flex gap-2 mt-2">
              <a href="" target="_blank">
                <FaFacebook size={30} />
              </a>
              <a href="www.linkedin.com" target="_blank">
                <BsLinkedin size={30} />
              </a>
              <a href="www.youtube.com" target="_blank">
                <FaYoutube size={30} />
              </a>
              <a href="www.twitter.com" target="_blank">
                <BsTwitter size={30} />
              </a>
            </div>
          </div>
        </div>
        <hr className="mt-20" />
        <div></div>
      </div>
    </div>
  );
}
