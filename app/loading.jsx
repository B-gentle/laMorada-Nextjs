import React from 'react';
import loader from '@/assets/images/loader.gif';
import Image from 'next/image';

const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Image src={loader} alt='loader' />
    </div>
  )
}

export default LoadingPage