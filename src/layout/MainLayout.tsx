"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

type Props = {
    children: React.ReactNode
}

type User = {
    name: string
    token: string
    refresh: string
} | null

const MainLayoutClient = ({ children }: Props) => {
    const [user, setUser] = useState<User>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathName = usePathname()

    useEffect(() => {
        const userStr = localStorage.getItem("user")
        if (userStr) {
            setUser(JSON.parse(userStr))
        }
    }, [])

    return (
        <div>
            <header className="flex justify-between items-center py-[21px] px-4 sm:px-6 md:px-8 lg:px-[124px] relative">
                <div className="flex items-center gap-[16px] md:gap-[32px] lg:gap-[48px]">
                    <div>
                        <Image
                            src={"/logo.svg"}
                            alt="logo"
                            width={160}
                            height={36}
                            priority
                            className="w-[120px] md:w-[140px] lg:w-[160px] h-auto"
                        />
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-[16px] lg:gap-[28px]">
                            <li>
                                <Link
                                    className={`text-[#515B6F] ${pathName === "/" ? "underline underline-offset-4 text-blue-700 rounded-md" : ""} font-[500] leading-[160%] hover:text-[#706bff]`}
                                    href={"/"}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`text-[#515B6F] ${pathName === "/specialists" ? "underline underline-offset-4 text-blue-700 rounded-md" : ""} font-[500] leading-[160%] hover:text-[#706bff]`}
                                    href={"/specialists"}
                                >
                                    Specialists
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`text-[#515B6F] ${pathName === "/alljobs" ? "underline underline-offset-4 text-blue-700 rounded-md" : ""} font-[500] leading-[160%] hover:text-[#706bff]`}
                                    href={"/alljobs"}
                                >
                                    All Jobs
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="hidden md:flex items-center gap-[16px] lg:gap-[32px]">
                    {user?.token ? (
                        <h3 className="font-bold text-[16px] lg:text-[20px]">{user.name}</h3>
                    ) : (
                        <Link
                            href={"/login"}
                            className="text-[#4640DE] font-[700] leading-[160%] px-[16px] lg:px-[24px] py-[8px] lg:py-[12px] cursor-pointer hover:text-[#9291b2] transition-all"
                        >
                            Login
                        </Link>
                    )}
                    {user?.token ? (
                        ""
                    ) : (
                        <Link
                            href={"/register"}
                            className="font-[700] rounded-md leading-[160%] bg-[#4640DE] py-[8px] lg:py-[12px] px-[16px] lg:px-[24px] text-white cursor-pointer hover:bg-[#8985ff] transition-all"
                        >
                            Sign Up
                        </Link>
                    )}
                </div>

                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="block w-6 h-0.5 bg-gray-800"></span>
                    <span className="block w-6 h-0.5 bg-gray-800 my-1"></span>
                    <span className="block w-6 h-0.5 bg-gray-800"></span>
                </button>

                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden">
                        <nav className="py-4 px-4">
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <Link
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block text-[#515B6F] ${pathName === "/" ? "underline underline-offset-4 text-blue-700 rounded-md" : ""} font-[500] leading-[160%] hover:text-[#706bff]`}
                                        href={"/"}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block text-[#515B6F] ${pathName === "/specialists" ? "underline underline-offset-4 text-blue-700 rounded-md" : ""} font-[500] leading-[160%] hover:text-[#706bff]`}
                                        href={"/specialists"}
                                    >
                                        Specialists
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block text-[#515B6F] ${pathName === "/alljobs" ? "underline underline-offset-4 text-blue-700 rounded-md" : ""} font-[500] leading-[160%] hover:text-[#706bff]`}
                                        href={"/alljobs"}
                                    >
                                        All Jobs
                                    </Link>
                                </li>
                            </ul>
                            <div className="flex flex-col gap-4 mt-4">
                                {user?.token ? (
                                    <h3 className="font-bold text-[16px]">{user.name}</h3>
                                ) : (
                                    <Link
                                        onClick={() => setIsMenuOpen(false)}
                                        href={"/login"}
                                        className="text-[#4640DE] font-[700] leading-[160%] inline-block py-[8px] cursor-pointer hover:text-[#9291b2] transition-all"
                                    >
                                        Login
                                    </Link>
                                )}
                                {user?.token ? (
                                    ""
                                ) : (
                                    <Link
                                        onClick={() => setIsMenuOpen(false)}
                                        href={"/register"}
                                        className="font-[700] rounded-md leading-[160%] bg-[#4640DE] py-[8px] px-[16px] text-white inline-block w-fit cursor-pointer hover:bg-[#8985ff] transition-all"
                                    >
                                        Sign Up
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[124px]">{children}</div>
        </div>
    )
}

export default MainLayoutClient
