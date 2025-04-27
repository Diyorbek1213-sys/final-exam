"use client"
import { useGetSpecialistsQuery, useUpdateTokenMutation } from '@/lib/slices/apiSlice'
import { user } from '@/types/types'
import Link from 'next/link'
import React, { useEffect } from 'react'

const page = () => {
  const { data, isLoading, error }: any = useGetSpecialistsQuery(undefined)
  const [giveToken] = useUpdateTokenMutation()

  console.log(data)

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

  return (
    <div>
      <div className='grid grid-cols-4 gap-7 pb-7 mt-7 max-[1050px]:grid-cols-3 max-[770px]:grid-cols-2'>
        {
          isLoading ? <h3>Loading...</h3> : (data ? data.map((user: user) => {
            return <div key={user.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white relative">
              <div className="px-6 py-4 mb-10">
                <div className="font-bold text-xl mb-2">
                  {user.first_name} {user.last_name}
                </div>
                <p className="text-gray-700 text-base">
                  <strong>Username:</strong> {user.username}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Email:</strong> {user.email}
                </p>
                {user.phone && (
                  <p className="text-gray-700 text-base">
                    <strong>Phone:</strong> {user.phone}
                  </p>
                )}
                {user.position && (
                  <p className="text-gray-700 text-base">
                    <strong>Position:</strong> {user.position}
                  </p>
                )}
                {user.age && (
                  <p className="text-gray-700 text-base">
                    <strong>Age:</strong> {user.age}
                  </p>
                )}
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={`/specialists/${user.id}`} className="bg-blue-500 cursor-pointer absolute bottom-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Profile
                </Link>
              </div>
            </div>
          }) : <p>Something went wrong, please try again later.</p>)
        }
      </div>
    </div>
  )
}

export default page