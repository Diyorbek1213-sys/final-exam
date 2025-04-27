"use client"
import { useLoginMutation } from '@/lib/slices/apiSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [login, setlogin] = useState({
        name: '',
        password: '',
    })
    const router = useRouter()
    const [loginUser] = useLoginMutation()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (login.name.length < 3) {
            return alert('Please fill in the name!')
        }

        if (login.password.length < 3) {
            return alert('Please fill in the password!')
        }

        try {
            const res = await loginUser({ user: login.name, pass: login.password })

            if (res.data?.access) {
                let data = {
                    name: login.name,
                    token: res.data?.access,
                    refresh: res.data?.refresh
                }
                localStorage.setItem('user', JSON.stringify(data))
                router.push('/')
                window.location.reload()
            }

            setlogin({
                name: '',
                password: ''
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='mt-28 flex justify-center items-center flex-col'>
            <h1 className='text-center font-[600] text-[32px] leading-[120%] text-[#202430] mb-[24px]'>Welcome Back, Dude</h1>
            <form className='flex flex-col justify-center items-center max-w-[410px] gap-[22px]'>
                <div className='flex flex-col'>
                    <label className='text-[#515B6F] font-[600] leading-[160%]' htmlFor="name">Full name</label>
                    <input value={login.name} onChange={(e) => setlogin({ ...login, name: e.target.value })} className='py-[12px] px-[16px] max-w-[700px] border-[#D6DDEB] outline-0 border' type="text" id='name' placeholder='Enter your full name' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[#515B6F] font-[600] leading-[160%]' htmlFor="password">Password</label>
                    <input value={login.password} onChange={(e) => setlogin({ ...login, password: e.target.value })} className='py-[12px] px-[16px] max-w-[700px] border-[#D6DDEB] outline-0 border' type="text" id='password' placeholder='Enter password' />
                </div>
                <button onClick={handleLogin} className='bg-[#4640DE] cursor-pointer py-[12px] px-[24px] w-full text-white font-[700] leading-[160%]'>Continue</button>
            </form>
            <h3 className='text-[#202430] mt-[24px] leading-[160%]'>Don't you have an account <Link href={'/register'} className='font-[600] leading-[150%] text-[#4640DE]'>Register</Link></h3>
            <p className='leading-[160%] text-[#7C8493] max-w-[420px] mt-[24px]'>By clicking 'Continue', you acknowledge that you have read and accept the <Link href={''} className='text-[#4640DE]'>Terms of Service</Link> and <Link href={''} className='text-[#4640DE]'>Privacy Policy.</Link></p>
        </div>
    )
}

export default page