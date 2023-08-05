import axios from "axios";

const BASE_URL = "https://remindify.vercel.app";

export default axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
