import axios from "axios";

const BASE_URL = "https://remindify.vercel.app";

export default axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
