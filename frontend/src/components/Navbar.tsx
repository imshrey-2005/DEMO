'use client';
import Link from 'next/link';
import React from 'react';
import { LoginDropdown } from './LoginDropdown';
import { ModeToggle } from './ModeToggle';
import SignOut from './SignOut';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

function Navbar() {
  const pathname = usePathname(); // Get current path
  const { user } = useClerk();

  // Function to check if a link is active
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between border-b bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-md">
      <Link
        href={'/'}
        className="font-extrabold text-3xl tracking-wide text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
      >
        Cipher<span className="text-purple-700 dark:text-purple-400">Haven</span>
      </Link>
      <div className="flex items-center justify-center gap-8 font-medium text-gray-700 dark:text-gray-300">
        <Link
          href="/"
          className={`${
            isActive('/')
              ? 'text-purple-700 dark:text-purple-400 font-semibold underline underline-offset-4'
              : 'hover:text-purple-700 dark:hover:text-purple-400'
          } transition-colors duration-300`}
        >
          Home
        </Link>
        {!user?.unsafeMetadata.isAdmin && (
          <Link
            href="/create-post"
            className={`${
              isActive('/create-post')
                ? 'text-purple-700 dark:text-purple-400 font-semibold underline underline-offset-4'
                : 'hover:text-purple-700 dark:hover:text-purple-400'
            } transition-colors duration-300`}
          >
            Create Post
          </Link>
        )}
        {(user?.unsafeMetadata as { isAdmin: boolean })?.isAdmin && (
          <Link
            href="/dashboard"
            className={`${
              isActive('/dashboard')
                ? 'text-purple-700 dark:text-purple-400 font-semibold underline underline-offset-4'
                : 'hover:text-purple-700 dark:hover:text-purple-400'
            } transition-colors duration-300`}
          >
            Dashboard
          </Link>
        )}
        <Link
          href="/"
          className={`${
            isActive('/lawbot')
              ? 'text-purple-700 dark:text-purple-400 font-semibold underline underline-offset-4'
              : 'hover:text-purple-700 dark:hover:text-purple-400'
          } transition-colors duration-300`}
        >
          Law Bot
        </Link>
        {/* Show Therapy Bot link only if not on the home page */}
        {pathname !== '/' && (
          <Link
            href="/therapybot"
            className={`${
              isActive('/therapybot')
                ? 'text-purple-700 dark:text-purple-400 font-semibold underline underline-offset-4'
                : 'hover:text-purple-700 dark:hover:text-purple-400'
            } transition-colors duration-300`}
          >
            Therapy Bot
          </Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        {!user ? (
          <LoginDropdown />
        ) : (
          <SignOut />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
