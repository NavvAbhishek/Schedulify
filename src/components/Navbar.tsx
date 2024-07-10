"use client";
import Image from "next/image";
import logo from "../../public/shedulify logo.png";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark, FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="">
            <span className="sr-only">Your Company</span>
            <Image
              src={logo}
              alt="Picture of the author"
              width={70}
              height={70}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-pink"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="desktop-nav text-pink text-md font-semibold leading-6 hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className="relative">
            <Link href="/profile">Profile</Link>
          </div>
          <div className="relative">
            <Link href="/profile/mark-attendance">Mark Attendance</Link>
          </div>
          <div className="relative">
            <Link href="/about-us">About us</Link>
          </div>
        </nav>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center">
          <Link href="/login" className="pink-button group">
            <div className="flex justify-center items-center gap-2">
              <p className="font-semibold transition-all duration-300 group-hover:mr-2">
                Getting Start
              </p>
              <FaArrowRightLong className="transition-all transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black pl-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Image
              src={logo}
              alt="Logo"
              width={80}
              height={80}
              className="cursor-pointer"
            />
            <button
              type="button"
              className="-mt-6 -ml-6 rounded-md p-1 text-pink"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <FaXmark className="mr-3 h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/dashboard"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                >
                  Profile
                </Link>
                <Link
                  href="/profile/mark-attendance"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                >
                  Mark Attendance
                </Link>
                <Link
                  href="/about-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                >
                  About us
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}