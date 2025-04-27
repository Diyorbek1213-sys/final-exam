"use client"
import { useGetSingleJobQuery } from '@/lib/slices/apiSlice'
import { job } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useGetSingleJobQuery(id)
    const wrapper = [data]

    console.log(data)

    return (
        <div>
            {
                isLoading ? <h3 className='text-[20px] text-gray-400 text-center'>Loading...</h3> : (data && wrapper ? wrapper.map((job: job) => {
                    return <div key={job.id} className='p-[24px] relative flex gap-[16px] pb-27 flex-col mx-auto mt-25 border max-w-[700px] border-[#D6DDEB]'>
                        <div className='flex justify-between items-center'>
                            <Image src={'/job.jpg'} alt='job' width={48} height={48} />
                            <span className='border px-[12px] py-[4px] border-[#4640DE] text-[#4640DE]'>{job.ish_vaqti}</span>
                        </div>
                        <div>
                            <h3 className='font-[600] text-[18px] text-[#25324B] leading-[160%]'>{job.title}</h3>
                            <h3 className='text-[#515B6F]'>{job.location}</h3>
                        </div>
                        <div>
                            <p className='text-[#7C8493]'>{job.description}</p>
                            <p><b>Salary per month:</b> ${job.salary}</p>
                        </div>
                        <div className='flex gap-[8px] flex-col absolute bottom-5'>
                            <span className='rounded-[80px] max-w-fit py-[4px] px-[16px] font-[600] bg-[#EB85331A] text-[#FFB836] whitespace-nowrap flex items-center'>{job.company}</span>
                            <span className='rounded-[80px] max-w-fit py-[4px] px-[16px] font-[600] bg-[#56CDAD1A] text-[#56CDAD] whitespace-nowrap flex items-center'>{job.work_type}</span>
                        </div>
                    </div>
                }) : <h3 className='font-bold text-center mt-14 text-[25px]'>Something went wrong, please try again later.</h3>)
            }
            <div className='flex justify-center mt-7'>
            <Link href={'/'} className='font-bold text-[20px] opacity-80 border py-3 px-7 rounded-md cursor-pointer hover:bg-black hover:text-white transition-all'>back</Link>
            </div>
        </div>
    )
}

export default page