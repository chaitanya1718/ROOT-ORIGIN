import React from 'react'
import "./css/productCarousel.css";

import { Link } from 'react-router-dom';
import { FaFilter } from "react-icons/fa";
import dairyCat from "../assets/dairyCat.png";
import sweetxcat from "../assets/sweetxcat.png";
import mush from "../assets/mushroomcat.png";
import ref from "../assets/refcat.png";
import dry from "../assets/dryfruitscat.png";
import nam from "../assets/namkeencat.png";
import snack from "../assets/snackscat.png";
import ice from "../assets/icecat.png";

const categories = [
  {
    id: 1,
    name: "Dairy",
    image: `${dairyCat}`,
  },
  {
    id: 2,
    name: "Sweets",
    image: `${sweetxcat}`,
  },
  {
    id: 3,
    name: "Dry-fruits",

    image:`${dry}`,
  },
  {
    id: 4,
    name: "Frozen",

    image: `${mush}`,
  },
  {
    id: 5,
    name: "Ice-creams",
 
    image:`${ice}`,
  },
    {
    id: 6,
    name: "Snacks",
 
    image: `${snack}`,
  },
  {
    id: 7,
    name: "Refreshments",
 
    image: `${ref}`,
  },
   {
    id: 8,
    name: "Namkeen",
 
    image: `${nam}`,
  },

];



function Categories() {
    
  return (
    <div>
      <h2 className="text-center text-2xl mb-3 font-semibold text-cyan-800">Explore Categories</h2>
       <section className="">
        <div className='flex items-center justify-between'>



    
     
        </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
         <Link
            key={category.id}
            to={`/categories/${category.name.toLowerCase()}`}
            className="category-link"
          >
            <div  style={{backgroundImage:`url(${category.image})`,  backgroundSize: 'cover'}} className="category-card card-hover flex flex-col justify-end items-center">
              {/* <div  className="product-info"> */}
              

                <span className='font-semibold bg-white px-2 rounded-xl' >{category.name}</span>
            
              {/* </div> */}
            </div>
          </Link>
        
        ))}
      </div>
    </section>
    </div>
  )
}

export default Categories
