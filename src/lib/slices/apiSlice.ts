import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainAPI = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mustafocoder.pythonanywhere.com/',
        prepareHeaders: (headers) => {
            const userStr = localStorage.getItem('user')
            const user = userStr ? JSON.parse(userStr) : null
            const accessStr = localStorage.getItem('access')
            const access = accessStr ? JSON.parse(accessStr) : null

            console.log(user)

            if (access) {
                headers.set('Authorization', `Bearer ${access}`)
            } else if (user?.token) {
                headers.set('Authorization', `Bearer ${user.token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        getJobsFromApi: builder.query({
            query: () => 'api/jobs/'
        }),
        getSingleJob: builder.query({
            query: (id) => `api/jobs/${id}/`
        }),
        register: builder.mutation({
            query: ({ user, pass }) => ({
                url: 'api/register/',
                method: 'POST',
                body: {
                    username: user,
                    password: pass
                }
            })
        }),
        login: builder.mutation({
            query: ({ user, pass }) => ({
                url: 'api/token/',
                method: 'POST',
                body: {
                    username: user,
                    password: pass
                }
            })
        }),
        createJob: builder.mutation({
            query: ({ title, company, description, work_type, salary, location, ish_vaqti }) => ({
                url: 'api/jobs/',
                method: 'POST',
                body: {
                    title,
                    company,
                    description,
                    work_type,
                    salary,
                    location,
                    ish_vaqti
                }
            })
        }),
        updateToken: builder.mutation({
            query: (refresh) => ({
                url: 'api/token/refresh/',
                method: 'POST',
                body: {
                    refresh: refresh
                }
            })
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `api/jobs/${id}/`,
                method: 'DELETE'
            })
        }),
        getSpecialists: builder.query({
            query: () => 'api/users/'
        }),
        getSingleUser: builder.query({
            query: (id) => `api/users/${id}/`
        }),
        editJob: builder.mutation({
            query: ({jobId, createJob}) => ({
                url: `api/jobs/${jobId}/`,
                method: 'PUT',
                body: {
                    company: createJob.company,
                    location: createJob.location,
                    salary: createJob.salary,
                    description: createJob.description,
                    ish_vaqti: createJob.ish_vaqti,
                    work_type: createJob.work_type,
                    title: createJob.title
                }
            })
        })
    })
})

export const {
    useGetSingleJobQuery,
    useGetJobsFromApiQuery,
    useRegisterMutation,
    useLoginMutation,
    useCreateJobMutation,
    useUpdateTokenMutation,
    useDeleteJobMutation,
    useGetSpecialistsQuery,
    useGetSingleUserQuery,
    useEditJobMutation
} = mainAPI