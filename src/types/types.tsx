export interface job {
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

export interface user {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    phone: number | null;
    email: string;
    position: null | string;
    age: number | null
}