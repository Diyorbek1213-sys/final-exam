import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    job: {
        id: number,
        title: string,
        company: string,
        description: string,
        location: string,
        created_at: string,
        work_type: string,
        ish_vaqti: string,
        salary: string,
        user: number
    }
}

const LatestJobsCard: React.FC<Props> = ({ job }) => {

    return (
        <Link href={`/${job.id}`} className='max-w-[580px] py-[24px] px-[40px] bg-[#ededf2] rounded-md'>
            <div className='flex items-center gap-[24px]'>
                <Image src={'/job.jpg'} alt='rasm' width={64} height={64} />
                <div>
                    <h2 className='font-[600] text-[20px] leading-[120%] text-[#25324B]'>{job.title}</h2>
                    <h3 className='text-[#515B6F] leading-[160%]'>{job.location}</h3>
                    <div className='flex items-center gap-[8px]'>
                        <span className='py-[6px] px-[10px] font-[600] leading-[160%] rounded-[80px] bg-[#56CDAD1A] text-[#56CDAD]'>{job.company}</span>
                        <span className='text-[#D6DDEB]'>|</span>
                        <span className='py-[6px] px-[10px] text-[#FFB836] border border-[#FFB836] font-[600] leading-[160%] rounded-[80px]'>{job.work_type}</span>
                        <span className='py-[6px] px-[10px] rounded-[80px] text-[#4640DE] border border-[#4640DE] font-[600] leading-[160%]'>{job.ish_vaqti}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LatestJobsCard