import React from 'react'
import {Link} from 'react-router-dom';

function BannerOffer() {
  return (
    <div className='flex flex-col mt-8'>
      <h1 className='text-2xl text-center font-semibold text-cyan-800'>Explore Offers</h1>
    <div className='bannerOffer flex justify-evenly items-center m-4'>
   <Link to="/deals">
    <div className='smallBanner'>
    </div>
   </Link>
    <Link to="/bulk-products">
        <div className='smallBanner2'>
      
    </div>
    </Link>
</div>
    </div>
  )
}

export default BannerOffer
