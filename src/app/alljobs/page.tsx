"use client"

import Image from "next/image"
import type React from "react"
import { useEffect, useState } from "react"
import { useCreateJobMutation, useGetJobsFromApiQuery, useUpdateTokenMutation } from "@/lib/slices/apiSlice"
import type { job } from "@/types/types"
import LatestJobsCard from "@/components/LatestJobsCard"
import JobCard from "@/components/JobCard"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

const page = () => {
  const { data, isLoading, error }: any = useGetJobsFromApiQuery(undefined)
  const { darkOrLight } = useSelector((state: RootState) => state.jobs)
  const [newJob] = useCreateJobMutation()
  const [inputValue, setInputValue] = useState("")
  const [hasError, setHasError] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  const [filtered, setFiltered] = useState<job[]>(data)
  const [typeView, setTypeView] = useState("card")
  const [createJob, setCreateJob] = useState({
    title: "",
    location: "",
    description: "",
    company: "",
    salary: "",
    work_type: "",
    ish_vaqti: "",
  })

  const [giveToken] = useUpdateTokenMutation()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null

    if (error && error.status === 401) {
      console.log('xato')
      const refresher = async () => {
        try {
          const res = await giveToken(user.refresh);
          if (res.data && res.data.access) {
            localStorage.setItem('access', JSON.stringify(res.data.access));
            console.log('Token refreshed successfully');
            window.location.reload()
          } else {
            console.log('Failed to refresh token');
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      };
      refresher()
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setFiltered(data)
    }
  }, [data])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(selectValue)
    console.log(inputValue)

    if (inputValue.length === 0) {
      setHasError(true)
      return alert("Please fill in the search field!")
    }

    setHasError(false)

    const sorted =
      (data &&
        data.filter((job: job) => {
          const title = job.title.toLowerCase().includes(inputValue.toLowerCase())
          const location = job.location.toLowerCase().includes(selectValue.toLowerCase())

          return title && location
        })) ||
      data

    setTimeout(() => {
      setFiltered(sorted)
    }, 700)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (createJob.title.length < 3) {
      return alert('Iltmos title 3 ta harfdan kam bo`lmasin')
    }

    if (createJob.location.length < 3) {
      return alert('Iltmos location 3 ta harfdan kam bo`lmasin')
    }

    if (createJob.description.length < 5) {
      return alert('Iltmos description 5 ta harfdan kam bo`lmasin')
    }

    if (createJob.company.length < 3) {
      return alert('Iltmos company 3 ta harfdan kam bo`lmasin')
    }

    if (createJob.salary.length === 0) {
      return alert('Iltmos salary qiymatini kiriting')
    }

    if (createJob.work_type.length < 3) {
      return alert('Iltmos work-type 3 ta harfdan kam bo`lmasin')
    }

    if (createJob.ish_vaqti.length < 3) {
      return alert('Iltmos ish-vaqti 3 ta harfdan kam bo`lmasin')
    }

    try {
      const res = await newJob({
        title: createJob.title,
        location: createJob.location,
        description: createJob.description,
        company: createJob.company,
        salary: createJob.salary,
        work_type: createJob.work_type,
        ish_vaqti: createJob.ish_vaqti,
      })
      if (res) {
        alert("Created!")
      }
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex justify-center items-center flex-col mt-10 md:mt-16 lg:mt-20">
        <h2 className={`${darkOrLight ? 'text-gray-300' : ''} text-center text-[#25324B] font-[600] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[110%]`}>
          Find your <span className="text-[#26A4FF]">dream companies</span>
        </h2>
        <div className="relative w-full max-w-[431px] flex justify-center">
          <Image className="w-full h-auto lg:ml-0" src={"/shapes.png"} alt="shape" width={431} height={12} />
        </div>

        <p className={`${darkOrLight ? 'text-gray-300' : ''} text-[16px] md:text-[18px] leading-[160%] text-[#515B6F] mt-[16px] md:mt-[24px] text-center`}>
          Find the dream companies you dream work for
        </p>

        <div className={`mt-[24px] md:mt-[32px] lg:mt-[40px] w-full max-w-[1192px]`}>
          <form className={`${darkOrLight ? 'bg-gray-300' : ''} flex flex-col md:flex-row items-start md:items-center justify-between w-full shadow-xl p-[16px] md:p-[24px] rounded-md gap-4 md:gap-2`}>
            <div className="flex items-center gap-[17px] w-full md:w-auto">
              <Image
                className="w-[24px] h-[24px] flex-shrink-0"
                src={"/search.svg"}
                alt="search"
                width={24}
                height={24}
                priority
              />
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`${hasError ? "border-2 border-red-500 rounded-md" : ""} outline-0 w-full`}
                type="text"
                placeholder="Job title or keyword"
              />
            </div>
            <div className="flex items-center gap-[17px] w-full md:w-auto">
              <Image
                className="w-[24px] h-[24px] flex-shrink-0"
                src={"/location.svg"}
                alt="location"
                width={24}
                height={24}
              />
              <select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                className="focus:outline-0 w-full"
              >
                <option>Select</option>
                {data
                  ? data.map((job: job) => {
                    return (
                      <option key={job.id} value={job.location}>
                        {job.location}
                      </option>
                    )
                  })
                  : "No locations here yet."}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#4640DE] w-full md:w-auto cursor-pointer hover:bg-[#6d68ff] transition-all rounded-md text-white py-[12px] md:py-[14px] px-[20px] md:px-[27px] text-[16px] md:text-[18px] font-[700]"
            >
              Search my job
            </button>
          </form>
          <p className={`${darkOrLight ? 'text-gray-300' : ''} mt-[12px] md:mt-[16px] text-[#515B6F] leading-[160%] text-sm md:text-base`}>
            Popular : Twitter, Microsoft, Apple, Facebook
          </p>
        </div>

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
                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`}                    type="text"
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
                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`}                    type="text"
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
                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`}                    type="text"
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
                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`}                    type="number"
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
                    className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`}                    type="text"
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
                className={`${darkOrLight ? 'bg-gray-300' : ''}  py-[12px] px-[16px] w-full border-[#D6DDEB] outline-0 border`}                type="text"
                id="time"
                placeholder="Enter work time"
              />
            </div>
            <button
              onClick={handleCreate}
              className="bg-[#4640DE] mt-[20px] md:mt-[25px] cursor-pointer py-[12px] px-[24px] w-full text-white font-[700] leading-[160%] rounded-md"
            >
              Create
            </button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full max-w-[923px] mt-[40px] md:mt-[56px] lg:mt-[72px] gap-4 sm:gap-0">
          <div>
            <h3 className={`${darkOrLight ? 'text-gray-300' : ''} font-[600] text-[24px] md:text-[28px] lg:text-[32px] leading-[120%] text-[#25324B]`}>
              All Jobs
            </h3>
            <h3 className={`${darkOrLight ? 'text-gray-300' : ''} leading-[160%] text-[#25324B]`}>Showing {filtered?.length}</h3>
          </div>
          <div className={`flex ${darkOrLight ? 'bg-gray-300 p-2 rounded-md' : ''} items-center gap-5`}>
            <button
              onClick={() => setTypeView("card")}
              className={`${typeView === "card" ? "bg-blue-300 p-1 rounded-md" : ""} cursor-pointer`}
            >
              <Image
                className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                src={"/type.svg"}
                alt="type"
                width={40}
                height={40}
                priority
              />
            </button>
            <button
              onClick={() => setTypeView("list")}
              className={`${typeView === "list" ? "bg-blue-300 p-1 rounded-md" : ""} cursor-pointer`}
            >
              <Image
                className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                src={"/list.svg"}
                alt="list"
                width={40}
                height={40}
                priority
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px] md:gap-x-[60px] lg:gap-x-[60px] gap-y-[24px] md:gap-y-[32px] mt-4 md:mt-7 w-full max-w-[1192px]">
          {isLoading ? (
            <h3 className="text-[20px] text-gray-400">Loading...</h3>
          ) : filtered?.length > 0 ? (
            filtered.map((job: job) =>
              typeView === "card" ? <JobCard job={job} key={job.id} /> : <LatestJobsCard job={job} key={job.id} />,
            )
          ) : (
            <h3>No jobs here yet.</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default page
