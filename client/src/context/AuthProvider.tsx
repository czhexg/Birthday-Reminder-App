import React, { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
    auth: { id: string; username: string; accessToken: string };
    setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextProps>({
    auth: { id: "", username: "", accessToken: "" },
    setAuth: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [auth, setAuth] = useState({ id: "", username: "", accessToken: "" });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
