"use client"
import { useRegisterMutation } from '@/lib/slices/apiSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const page = () => {
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })

    const router = useRouter()
    const [registerUser] = useRegisterMutation()
    const formRef = useRef<HTMLFormElement>(null)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (register.name.length < 3) {
            return alert('Please fill in the name!')
        }

        if (register.email.length < 10) {
            return alert('Please fill in the email!')
        }

        if (register.password.length < 3) {
            return alert('Please fill in the password!')
        }

        if (register.confirm.length < 3) {
            return alert('Please fill in the confirm password!')
        }

        if (register.password !== register.confirm) {
            return alert("Password didn't match!")
        }

        try {
            const res = await registerUser({ user: register.name, pass: register.password })

            if (res.data?.access) {
                // let data = {
                //     username: register.name,
                //     password: register.password,
                //     token: res.data?.access
                // }
                // localStorage.setItem('user', JSON.stringify(data))
                router.push('/login')
            }
            setRegister({
                name: '',
                email: '',
                password: '',
                confirm: ''
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='mt-28 flex justify-center items-center flex-col'>
            <h1 className='text-center font-[600] text-[32px] leading-[120%] text-[#202430] mb-[24px]'>Get more opportunities</h1>
            <form ref={formRef} className='flex flex-col justify-center items-center max-w-[410px] gap-[22px]'>
                <div className='flex flex-col'>
                    <label className='text-[#515B6F] font-[600] leading-[160%]' htmlFor="name">Full name</label>
                    <input value={register.name} onChange={(e) => setRegister({ ...register, name: e.target.value })} className='py-[12px] px-[16px] max-w-[700px] border-[#D6DDEB] outline-0 border' type="text" id='name' placeholder='Enter your full name' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[#515B6F] font-[600] leading-[160%]' htmlFor="email">Email Address</label>
                    <input value={register.email} onChange={(e) => setRegister({ ...register, email: e.target.value })} className='py-[12px] px-[16px] max-w-[700px] border-[#D6DDEB] outline-0 border' type="text" id='email' placeholder='Enter email address' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[#515B6F] font-[600] leading-[160%]' htmlFor="password">Password</label>
                    <input value={register.password} onChange={(e) => setRegister({ ...register, password: e.target.value })} className='py-[12px] px-[16px] max-w-[700px] border-[#D6DDEB] outline-0 border' type="text" id='password' placeholder='Enter password' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[#515B6F] font-[600] leading-[160%]' htmlFor="confirm">Confirm password</label>
                    <input value={register.confirm} onChange={(e) => setRegister({ ...register, confirm: e.target.value })} className='py-[12px] px-[16px] max-w-[700px] border-[#D6DDEB] outline-0 border' type="text" id='confirm' placeholder='Confirm passsword' />
                </div>
                <button onClick={handleRegister} className='bg-[#4640DE] cursor-pointer py-[12px] px-[24px] w-full text-white font-[700] leading-[160%]'>Continue</button>
            </form>
            <h3 className='text-[#202430] mt-[24px] leading-[160%]'>Already have an account? <Link href={'/login'} className='font-[600] leading-[150%] text-[#4640DE]'>Login</Link></h3>
            <p className='leading-[160%] text-[#7C8493] max-w-[420px] mt-[24px]'>By clicking 'Continue', you acknowledge that you have read and accept the <Link href={''} className='text-[#4640DE]'>Terms of Service</Link> and <Link href={''} className='text-[#4640DE]'>Privacy Policy.</Link></p>
        </div>
    )
}

export default page