"use client";
import Image from "next/image";
import logo from "../../public/LogoRBG.png";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";

type UserData = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  className: string;
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data.data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getUserDetails();
  }, []);

  return (
    <header className="bg-black">
      <nav
        className="flex items-center justify-between mx-3 md:mx-40"
        aria-label="Global"
      >
        {/* -----------------logo-------------------- */}
        <div className="">
          <Link href="/" className="">
            <span className="sr-only">Your Company</span>
            <Image
              src={logo}
              alt="Picture of the author"
              width={75}
              height={75}
            />
          </Link>
        </div>

        {/* -----------------Links------------------- */}
        <nav className="desktop-nav text-pink text-md font-semibold leading-6 hidden md:flex md:gap-x-6 lg:gap-x-6">
          <div className="relative">
            <Link href="/">Home</Link>
          </div>
          <div className="relative">
            {userData?.role === "admin" ? (
              <Link href="/admin-dashboard">Dashboard</Link>
            ) : (
              <Link href="/teacher-dashboard">Dashboard</Link>
            )}
          </div>
          <div className="relative">
            <Link href="/profile">Profile</Link>
          </div>
          <div className="relative">
            <Link href="/about-us">About us</Link>
          </div>
        </nav>

        {/* -----------------buttons------------------- */}

        <div className="hidden md:flex">
          {userData?.role === "admin" ? (
            <Link href="/timetable-data" className="pink-button">
              <div className="flex justify-center items-center gap-2 p-[7px]">
                <p className="font-semibold transition-all duration-300">
                  Manage Timetable
                </p>
                🗂️
              </div>
            </Link>
          ) : userData?.role === "student" || userData?.role === "teacher" ? (
            <Link href="/timetable" className="pink-button">
              <div className="flex justify-center items-center gap-2 p-[7px]">
                <p className="font-semibold transition-all duration-300">
                  View Timetable
                </p>
                👀
              </div>
            </Link>
          ) : (
            <Link href="/login" className="pink-button">
              <div className="flex justify-center items-center gap-2 p-[7px]">
                <p className="font-semibold transition-all duration-300">
                  Getting Start
                </p>
                🚀
              </div>
            </Link>
          )}
        </div>

        {/* -----------------bars------------------- */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-pink"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black pl-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                <div>
                  {userData?.role === "admin" ? (
                    <Link
                      href="/admin-dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/teacher-dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
                <div>
                  <Link
                    href="/profile"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                  >
                    Profile
                  </Link>
                </div>
                <div>
                  <Link
                    href="/about-us"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-dark-blue"
                  >
                    About us
                  </Link>
                </div>
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
        </DialogPanel>
      </Dialog>
    </header>
  );
}
