"use client"
import { useGetSingleUserQuery, useUpdateTokenMutation } from '@/lib/slices/apiSlice'
import { user } from '@/types/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const { id } = useParams()
    const { data, isLoading, error }: any = useGetSingleUserQuery(id)
    const wrapper = [data]
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

    console.log(data)

    return (
        <div>
            <div>
                {
                    isLoading ? <h3>Loading...</h3> : (wrapper ? wrapper.map((user: user) => {
                        return <div key={user.id} className="max-w-md mx-auto p-6 mt-[100px] bg-white shadow-md rounded-md">
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-bold mb-2">
                                    {user.first_name} {user.last_name}
                                </h2>
                                <p className="text-gray-600 mb-2">
                                    <strong>Username:</strong> {user.username}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Email:</strong> {user.email}
                                </p>
                                {user.phone && (
                                    <p className="text-gray-600 mb-2">
                                        <strong>Phone:</strong> {user.phone}
                                    </p>
                                )}
                                {user.position && (
                                    <p className="text-gray-600 mb-2">
                                        <strong>Position:</strong> {user.position}
                                    </p>
                                )}
                                {user.age && (
                                    <p className="text-gray-600 mb-2">
                                        <strong>Age:</strong> {user.age}
                                    </p>
                                )}
                            </div>
                            <div className='flex items-center justify-center mt-5'>
                                <Link href={'/'} className='font-bold text-[20px] opacity-80 border py-3 px-7 rounded-md cursor-pointer hover:bg-black hover:text-white transition-all'>back</Link>
                            </div>
                        </div>
                    }) : <p>Something went wrong, please try again later.</p>)
                }
            </div>
        </div>
    )
}

export default page