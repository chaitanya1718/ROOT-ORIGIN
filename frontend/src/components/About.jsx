import React from "react";
import { TbBottleFilled } from "react-icons/tb";
import { IoIceCreamSharp } from "react-icons/io5";
import { FaVanShuttle } from "react-icons/fa6";
import sufiyan from "../assets/sufiyan.jpg";
import mahesh from "../assets/mahesh.jpeg";
import shubham from "../assets/shubham.jpeg";
import chaithu from "../assets/chaithu.jpg";
import DefaultHeader from "./DefaultHeader";

const developers = [
  {
    name: "Shubham Pradhan",
    role: "Backend Developer",
    image: `${shubham}`,
  },
  {
    name: "Mahesh",
    role: "frontend Developer",
    image: `${mahesh}`,
  },
  {
    name: "Chaitanya",
    role: "Full stack developer",
    image: `${chaithu}`,
  },
  {
    name: "MD Sufiyan",
    role: "Full Stack Developer",
    image: `${sufiyan}`,
  },
];

const About = () => {
  return (
    <section className="w-full py-12 px-6">
      <DefaultHeader />

      <div className="features flex justify-around items-center py-8 flex-wrap gap-6">
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

        <div className="service-card bg-cyan-300 w-80 h-60 rounded-xl p-5 flex flex-col items-center text-center">
          <span className="text-5xl">
            <FaVanShuttle />
          </span>
          <h3 className="text-xl font-semibold mt-3">Daily Subscription Plans</h3>
          <p className="text-sm mt-2 text-cyan-900">
            Subscribe once and receive fresh nutrition essentials every day,
            hassle-free.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Developers</h2>

        <div className="flex justify-center gap-8 flex-wrap">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl w-64 p-6 flex flex-col items-center text-center"
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-28 h-28 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{dev.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{dev.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
