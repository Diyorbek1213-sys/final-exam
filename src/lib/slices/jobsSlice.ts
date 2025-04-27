import { createSlice } from "@reduxjs/toolkit";

interface job {
    id: number;
    title: string;
    company: string;
    description: string;
    location: string;
    created_at: string;
    work_type: string;
    ish_vaqti: string;
    salary: string;
    user: number
}

interface jobsState {
    jobs: job[] | null,
    darkOrLight: boolean
}

const initialState: jobsState = {
    jobs: null,
    darkOrLight: false
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        getJobs: (state, action) => {
            state.jobs = action.payload
        },
        darkLight: (state, action) => {
            state.darkOrLight = action.payload
        }
    }
})

export default jobsSlice.reducer
export const { getJobs, darkLight } = jobsSlice.actions