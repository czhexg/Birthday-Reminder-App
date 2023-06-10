import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
    const { auth, setAuth } = useAuth();

    async function refresh() {
        const response = await axios.get("/api/refresh", {
            withCredentials: true,
        });

        if (auth.username) {
            setAuth((prev: {}) => {
                console.log(prev);
                console.log(response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken };
            });
        } else {
            setAuth(() => {
                console.log(response.data.accessToken);
                return {
                    username: response.data.username,
                    accessToken: response.data.accessToken,
                };
            });
        }

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;
