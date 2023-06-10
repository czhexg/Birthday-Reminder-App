import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";

function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();
    const refresh = useRefreshToken();
    const [refreshed, setRefreshed] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshCounter, setRefreshCounter] = useState(0);

    let refreshedData: any = null;
    async function handleRefresh() {
        console.log("handlerefresh run");
        setRefreshCounter(refreshCounter + 1);

        try {
            refreshedData = await refresh();
            console.log("refreshedData: ");
            console.log(refreshedData);

            setRefreshed(refreshedData);
        } catch (error) {
            console.error("Error refreshing token:", error);
            setRefreshed(null);
        }
    }

    useEffect(() => {
        console.log(auth.username);

        if (!auth.username) {
            console.log("useeffect username null run");

            handleRefresh();
        }
    }, []);

    useEffect(() => {
        if (refreshCounter > 0) {
            setIsLoading(false);
        } else if (refreshedData === null) {
            setIsLoading(true); // Set loading state
        } else {
            setIsLoading(false); // Clear loading state
        }
    }, [refreshedData]);

    if (auth.username) {
        return <Outlet />;
    } else {
        if (isLoading) {
            return null; // Render nothing until loading is complete
        } else if (!refreshedData) {
            console.log(refreshedData);

            return <Navigate to="/login" state={{ from: location }} replace />;
        } else {
            return <Outlet />;
        }
    }
}

export default RequireAuth;
