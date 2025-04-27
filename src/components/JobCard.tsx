import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

interface jobProps {
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

const JobCard: React.FC<jobProps> = ({ job }) => {

    const [bgColor, setBgColor] = useState(['#EB85331A', '#56CDAD1A', '#4640DE1A', '#FF65501A'])
    const renderOne = useMemo(() => {
        let random = Math.floor(Math.random() * bgColor.length)
        return random
    }, [])
    const renderTwo = useMemo(() => {
        let secondRandom = Math.floor(Math.random() * bgColor.length)
        return secondRandom
    }, [])

    let current = bgColor[renderOne]
    let currentText: string = '#FFB836'
    let secondCurrent = bgColor[renderTwo]
    let secondCurrentText = '#FFB836'



    const secondCheck = () => {
        if (secondCurrent === '#EB85331A') {
            secondCurrentText = '#FFB836'
        } else if (secondCurrent === '#56CDAD1A') {
            secondCurrentText = '#56CDAD'
        } else if (secondCurrent === '#4640DE1A') {
            secondCurrentText = '#4640DE'
        } else if (secondCurrent === '#FF65501A') {
            secondCurrentText = '#FF6550'
        }
    }

    secondCheck()

    const check = () => {
        if (current === '#EB85331A') {
            currentText = '#FFB836'
        } else if (current === '#56CDAD1A') {
            currentText = '#56CDAD'
        } else if (current === '#4640DE1A') {
            currentText = '#4640DE'
        } else if (current === '#FF65501A') {
            currentText = '#FF6550'
        }
    }

    check()

    return (
        <Link href={`/${job.id}`} className="p-[24px] relative flex gap-[16px] flex-col border max-w-[300px] border-[#D6DDEB]">
            <div className="flex justify-between items-center">
                <Image src={"/job.jpg"} alt="job" width={48} height={48} />
                <span className="border px-[12px] py-[4px] border-[#4640DE] text-[#4640DE]">
                    {job.ish_vaqti}
                </span>
            </div>

            <div>
                <h3 className="font-[600] text-[18px] text-[#25324B] leading-[160%]">{job.title}</h3>
                <h3 className="text-[#515B6F]">{job.location}</h3>
            </div>

            <div className="flex-1">
                <p className="text-[#7C8493] line-clamp-3">{job.description}</p>
            </div>

            <div className="flex gap-[8px] flex-wrap mt-auto">
                <span
                    style={{ backgroundColor: current, color: currentText }}
                    className="rounded-[80px] max-w-fit py-[4px] px-[16px] font-[600] whitespace-nowrap flex items-center"
                >
                    {job.company}
                </span>
                <span
                    style={{ backgroundColor: secondCurrent, color: secondCurrentText }}
                    className="rounded-[80px] max-w-fit py-[4px] px-[16px] font-[600] whitespace-nowrap flex items-center"
                >
                    {job.work_type}
                </span>
            </div>
        </Link>
    );

}

export default JobCard