"use client"
import { useGetSpecialistsQuery, useUpdateTokenMutation } from '@/lib/slices/apiSlice'
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
    <div>page</div>
  )
}

export default page