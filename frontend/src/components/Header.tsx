'use client';

import Image from 'next/image';
import React from 'react';
import banner from '../assets/banner.png';

function Header() {
  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
      <div className="flex items-center mt-12 gap-16 lg:gap-32">
        <div className="flex flex-col gap-6">
          <h1 className="font-extrabold text-[36px] lg:text-[48px] text-gray-800 dark:text-white leading-tight">
            Empower Your Support Experience with{' '}
            <span className="text-purple-600 dark:text-purple-400">Cipher-Haven</span>
          </h1>
          <p className="text-[18px] lg:text-[20px] text-gray-600 dark:text-gray-300 leading-relaxed">
            At SupportSafe, we&apos;re dedicated to ensuring every issue gets
            the attention it deserves. Easily create support tickets, monitor
            real-time updates, and even help resolve community tickets. Your
            support journey starts here, and we&apos;re with you every step of
            the way! 🚀
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => (alert('Coming soon!'))}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-lg text-white rounded-full shadow-lg transform hover:scale-105 duration-300 ease-in-out font-semibold"
            >
              Therapy Bot
            </button>
          </div>
        </div>
        <Image
          src={banner}
          width={500}
          height={500}
          alt="banner"
          className="scale-x-[-1] drop-shadow-lg"
        />
      </div>
    </div>
  );
}

export default Header;
