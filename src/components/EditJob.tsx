import { useEditJobMutation } from '@/lib/slices/apiSlice'
import { setModal } from '@/lib/slices/jobsSlice'
import { RootState } from '@/lib/store'
import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditJob = () => {
    const { darkOrLight } = useSelector((state: RootState) => state.jobs)
    const { jobId } = useSelector((state: RootState) => state.jobs)
    const [editJob] = useEditJobMutation()
    const dispatch = useDispatch()

    const [createJob, setCreateJob] = useState({
        title: '',
        location: '',
        description: '',
        company: '',
        salary: '',
        work_type: '',
        ish_vaqti: ''
    })

    const handleEdit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const res = await editJob({jobId, createJob})
            if (res.data?.company) {
                dispatch(setModal(false))
                alert('Job updated successfully.')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-400 p-4 rounded-md -translate-y-1/2'>
            <div className="mt-[20px] md:mt-[25px] w-full max-w-[1192px]">
                <form className="border p-4 md:p-5 rounded-md border-gray-400">
                    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-[16px] md:gap-[22px]">
                        <div className="w-full lg:w-1/2">
                            <div className="flex flex-col mb-4">
                                <label className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F] font-[600] leading-[160%]" htmlFor="title`}>
                                    Job title
                                </label>
                                <input
                                    value={createJob.title}
                                    onChange={(e) => setCreateJob({ ...createJob, title: e.target.value })}
                                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`}
                                    type="text"
                                    id="title"
                                    placeholder="Enter job title"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F] font-[600] leading-[160%]" htmlFor="location`}>
                                    Location
                                </label>
                                <input
                                    value={createJob.location}
                                    onChange={(e) => setCreateJob({ ...createJob, location: e.target.value })}
                                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`} type="text"
                                    id="location"
                                    placeholder="Enter location"
                                />
                            </div>
                            <div className="flex flex-col mb-4 lg:mb-0">
                                <label className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F] font-[600] leading-[160%]" htmlFor="description`}>
                                    Description
                                </label>
                                <input
                                    value={createJob.description}
                                    onChange={(e) => setCreateJob({ ...createJob, description: e.target.value })}
                                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`} type="text"
                                    id="description"
                                    placeholder="Enter description"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="flex flex-col mb-4">
                                <label className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F] font-[600] leading-[160%]" htmlFor="company`}>
                                    Company
                                </label>
                                <input
                                    value={createJob.company}
                                    onChange={(e) => setCreateJob({ ...createJob, company: e.target.value })}
                                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`} type="text"
                                    id="company"
                                    placeholder="Enter company"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F] font-[600] leading-[160%]" htmlFor="salary`}>
                                    Salary
                                </label>
                                <input
                                    value={createJob.salary}
                                    onChange={(e) => setCreateJob({ ...createJob, salary: e.target.value })}
                                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`} type="number"
                                    id="salary"
                                    placeholder="Enter salary"
                                />
                            </div>
                            <div className="flex flex-col mb-4 lg:mb-0">
                                <label className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F] font-[600] leading-[160%]" htmlFor="work`}>
                                    Work-type
                                </label>
                                <input
                                    value={createJob.work_type}
                                    onChange={(e) => setCreateJob({ ...createJob, work_type: e.target.value })}
                                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`} type="text"
                                    id="work"
                                    placeholder="Enter work-type"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F] font-[600] leading-[160%]" htmlFor="time`}>
                            Time
                        </label>
                        <input
                            value={createJob.ish_vaqti}
                            onChange={(e) => setCreateJob({ ...createJob, ish_vaqti: e.target.value })}
                            className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`} type="text"
                            id="time"
                            placeholder="Enter work time"
                        />
                    </div>
                    <button
                        onClick={handleEdit}
                        className="bg-[#4640DE] mt-[20px] md:mt-[25px] cursor-pointer py-[12px] px-[24px] w-full text-white font-[700] leading-[160%] rounded-md"
                    >
                        Edit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditJob