"use client"
import EditJob from '@/components/EditJob'
import { useDeleteJobMutation, useGetSingleJobQuery, useUpdateTokenMutation } from '@/lib/slices/apiSlice'
import { jobIdEdit, setModal } from '@/lib/slices/jobsSlice'
import { RootState } from '@/lib/store'
import { job } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { darkOrLight } = useSelector((state: RootState) => state.jobs)
  const { modale } = useSelector((state: RootState) => state.jobs)
  const { data, isLoading, error }: any = useGetSingleJobQuery(id)
  const [deleteJob] = useDeleteJobMutation()
  const wrapper = [data]
  const router = useRouter()

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

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteJob(id)

      console.log(res)
      if (res) {
        alert('Job deleted successfully')
        router.push('/')
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (id: number) => {
    dispatch(setModal(true))
    dispatch(jobIdEdit(id))
  }

  return (
    <div className='relative'>
      {
        isLoading ? <h3 className={`${darkOrLight ? 'text-gray-300' : ''} text-[20px] text-gray-400 text-center`}>Loading...</h3> : (data && wrapper ? wrapper.map((job: job) => {
          return <div key={job.id} className={`p-[24px] relative flex gap-[16px] pb-27 flex-col mx-auto mt-25 border max-w-[700px] border-[#D6DDEB] ${modale ? 'opacity-20 pointer-events-none' : ''}`}>
            <div className='flex justify-between items-center'>
              <Image src={'/job.jpg'} alt='job' width={48} height={48} />
              <span className={`${darkOrLight ? 'text-gray-300 border-gray-300' : ''} border px-[12px] py-[4px] border-[#4640DE] text-[#4640DE]`}>{job.ish_vaqti}</span>
            </div>
            <div>
              <h3 className={`${darkOrLight ? 'text-gray-300' : ''} font-[600] text-[18px] text-[#25324B] leading-[160%]`}>{job.title}</h3>
              <h3 className={`${darkOrLight ? 'text-gray-300' : ''} text-[#515B6F]`}>{job.location}</h3>
            </div>
            <div>
              <p className={`${darkOrLight ? 'text-gray-300' : ''} text-[#7C8493]`}>{job.description}</p>
              <p className={`${darkOrLight ? 'text-gray-300' : ''}`}><b>Salary per month:</b> ${job.salary}</p>
            </div>
            <div className='flex gap-[8px] flex-col absolute bottom-5'>
              <span className='rounded-[80px] max-w-fit py-[4px] px-[16px] font-[600] bg-[#EB85331A] text-[#FFB836] whitespace-nowrap flex items-center'>{job.company}</span>
              <span className='rounded-[80px] max-w-fit py-[4px] px-[16px] font-[600] bg-[#56CDAD1A] text-[#56CDAD] whitespace-nowrap flex items-center'>{job.work_type}</span>
            </div>
            <button onClick={() => handleDelete(job.id)} className='py-3 px-10 cursor-pointer bg-blue-800 text-white rounded-md hover:bg-blue-500 hover:text-white'>Delete</button>
            <button onClick={() => handleEdit(job.id)} className='py-3 px-10 cursor-pointer bg-blue-800 text-white rounded-md hover:bg-blue-500 hover:text-white'>Edit</button>
          </div>
        }) : <h3 className={`${darkOrLight ? 'text-gray-300' : ''} font-bold text-center mt-14 text-[25px]`}>Something went wrong, please try again later.</h3>)
      }

      <div className='flex justify-center mt-7'>
        <Link href={'/'} className={`${darkOrLight ? 'text-gray-300 border-gray-300' : ''} font-bold text-[20px] opacity-80 border py-3 px-7 rounded-md cursor-pointer hover:bg-black hover:text-white transition-all`}>back</Link>
      </div>

      {modale && <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
        <EditJob />
      </div>}
    </div>
  )
}

export default page
