"use client"
import { useGetJobsFromApiQuery, useUpdateTokenMutation } from "@/lib/slices/apiSlice"
import type { job } from "@/types/types"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"
import JobCard from "@/components/JobCard"
import LatestJobsCard from "@/components/LatestJobsCard"

const page = () => {
  const { data, error, isLoading } = useGetJobsFromApiQuery(undefined)
  const [filtered, setFiltered] = useState<job[]>(data)
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
    if (data?.length > 0) {
      setFiltered(data)
    }
  }, [data])
  const [inputValue, setInputValue] = useState("")
  const [selectValue, setSelectValue] = useState("")
  const [hasError, setHasError] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

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

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className="mt-[82px] md:mt-[60px] sm:mt-[40px]">
        <h1 className="font-[600] text-[36px] sm:text-[42px] md:text-[56px] lg:text-[72px] leading-[1.2] md:leading-[1.3] lg:leading-[110px] max-w-[500px] text-[#25324B]">
          Discover more than <span className="text-[#26A4FF]">5000+ Jobs</span>
        </h1>
        <div className="w-full max-w-[455px]">
          <Image src={"/shape.png"} alt="shape" width={455} height={33} priority className="w-full h-auto" />
        </div>
        <p className="text-[#515B6F] text-[16px] md:text-[18px] lg:text-[20px] leading-[160%] max-w-[521px] mt-[15px] md:mt-[23px]">
          Great platform for the job seeker that searching for new career heights and passionate about startups.
        </p>

        <div className="mt-[20px] md:mt-[23px] bg-[#ededf2] w-full max-w-[852px] p-[12px] md:p-[16px] shadow-2xl rounded-md">
          <form className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-2">
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
                className={`${hasError ? "border-2 border-red-500 rounded-md" : ""} outline-0 w-full bg-transparent`}
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
                className="focus:outline-0 w-full bg-transparent"
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
        </div>

        <p className="mt-[20px] md:mt-[25px] text-[#202430] font-[500] text-sm md:text-base">
          Popular : UI Designer, UX Researcher, Android, Admin
        </p>

        <div className="mt-[60px] md:mt-[80px] lg:mt-[103px]">
          <h3 className="text-[16px] md:text-[18px] text-[#202430]">Companies we helped grow</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-4 items-center mt-[20px] md:mt-[32px]">
            <Image
              className="w-auto h-[30px] md:h-[40px] object-contain"
              src={"/vodafone.png"}
              alt="vodafone"
              width={154}
              height={40}
              priority
            />
            <Image
              className="w-auto h-[24px] md:h-[32px] object-contain"
              src={"/intel.png"}
              alt="intel"
              width={83}
              height={32}
              priority
            />
            <Image
              className="w-auto h-[20px] md:h-[24px] object-contain"
              src={"/tesla.png"}
              alt="tesla"
              width={183}
              height={24}
              priority
            />
            <Image
              className="w-auto h-[22px] md:h-[28px] object-contain"
              src={"/amd.png"}
              alt="amd"
              width={117}
              height={28}
              priority
            />
            <Image
              className="w-auto h-[24px] md:h-[32px] object-contain col-span-2 sm:col-span-1"
              src={"/talkit.png"}
              alt="talkit"
              width={109}
              height={32}
              priority
            />
          </div>
        </div>

        <div className="mt-[50px] md:mt-[60px] lg:mt-[72px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <h2 className="font-[600] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] md:leading-[1.3] lg:leading-[110px] text-[#25324B]">
              Featured <span className="text-[#26A4FF]">jobs</span>
            </h2>
            <Link href={"#"} className="font-[600] leading-[160%] text-[#4640DE] text-sm md:text-base">
              Show all jobs <span className="text-[20px] md:text-[30px]">&#8594;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] md:gap-[32px] mt-6 md:mt-8">
            {isLoading ? (
              <h3 className="text-[20px] text-gray-400">Loading...</h3>
            ) : data ? (
              data.map((job: job) => {
                return <JobCard job={job} key={job.id} />
              })
            ) : (
              <h3>No jobs here yet.</h3>
            )}
          </div>
        </div>

        <div className="mt-[50px] md:mt-[60px] lg:mt-[72px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <h2 className="text-[#25324B] text-[32px] md:text-[40px] lg:text-[48px] font-[600] leading-[1.2] md:leading-[1.3] lg:leading-[110%]">
              Latest <span className="text-[#26A4FF]">jobs open</span>
            </h2>
            <Link href={"#"} className="font-[600] leading-[160%] text-[#4640DE] text-sm md:text-base">
              Show all jobs <span className="text-[20px] md:text-[30px]">&#8594;</span>
            </Link>
          </div>

          <div className="mt-[30px] md:mt-[48px] grid grid-cols-1 md:grid-cols-2 pb-15 gap-6 md:gap-10">
            {isLoading ? (
              <h3 className="text-[20px] text-gray-400">Loading...</h3>
            ) : filtered?.length > 0 ? (
              filtered.map((job: job) => <LatestJobsCard job={job} key={job.id} />)
            ) : (
              <h3>No jobs here yet.</h3>
            )}

            {filtered?.length === 0 && <h3>No jobs matched.</h3>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
