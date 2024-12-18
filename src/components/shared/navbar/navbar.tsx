"use client";
import logo from "@/app/assets/logo/logo.png";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [header, setHeader] = useState(false);

  const navLink = (
    <>
      <li>
        <Link href="">Home</Link>
      </li>
      <li>
        <Link href="">About</Link>
      </li>
      <li>
        <Link href="">Contat</Link>
      </li>
    </>
  );
  const scrollHeader = () => {
    if (window.scrollY > 50) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("scroll", scrollHeader);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={
        header
          ? "bg-[#1931e6] bg-opacity-55 py-2 sticky z-50 top-0 w-full text-white transition-all duration-300"
          : "bg-transparent w-full absolute z-50 py-2 text-white transition-all duration-300"
      }
    >
      <div className="px-5   lg:px-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              className="p-0"
              src={logo}
              height={30}
              width={30}
              alt="logo"
            />

            <h1 className="text-2xl font-playrite font-bold">Head Blocks</h1>
          </div>
          <div className="hidden lg:flex list-none gap-3  cursor-pointer">
            {navLink}
          </div>
          <div className="lg:hidden">
            <button onClick={() => setToggleMenu(!toggleMenu)}>
              {toggleMenu ? <X className="h-6" /> : <Menu className="h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`fixed z-40 top-0 left-0 h-full w-3/4 bg-black bg-opacity-80 text-white overflow-hidden flex flex-col gap-12 origin-left duration-700 transform ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-8">
          <div className="flex flex-col list-none mt-10 gap-1 tracking-wider">
            {navLink}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
