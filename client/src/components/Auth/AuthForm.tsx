import { Box, Button, Container, TextField } from "@mui/material";
import React, { useContext, useState } from "react";

import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

import AuthFormStyles from "../../componentStyles/Auth/AuthForm.module.css";
import AuthField from "./AuthField";
import SwitchAuth from "./SwitchAuth";
import { LoginStateType, RegisterStateType } from "../../types/Types";

type AuthFormProps = {
    currentAuth: string;
};

export default function AuthForm(props: AuthFormProps): JSX.Element {
    const { setAuth } = useContext(AuthContext);

    const [loginInfo, setLoginInfo] = useState<LoginStateType>({
        username: "",
        password: "",
    });
    const [registerInfo, setRegisterInfo] = useState<RegisterStateType>({
        email: "",
        username: "",
        fullname: "",
        password: "",
    });

    async function handleSubmit(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        if (props.currentAuth == "Login") {
            // send login
            const response = await axios.post("/login", loginInfo, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(response.data);
        } else {
            // send registration
        }
    }

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                width: "348px",
                margin: "10px",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #dbdbdb",
                    marginBottom: "10px",
                    padding: "2rem",
                    width: "100%",
                }}
            >
                <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                    Remindify
                </h1>
                {props.currentAuth == "Login" ? (
                    <>
                        <AuthField
                            id="username"
                            label="Username"
                            loginInfo={loginInfo}
                            setLoginInfo={setLoginInfo}
                        />
                        <AuthField
                            id="password"
                            label="Password"
                            loginInfo={loginInfo}
                            setLoginInfo={setLoginInfo}
                        />
                    </>
                ) : (
                    <>
                        <AuthField
                            id="email"
                            label="Email"
                            registerInfo={registerInfo}
                            setRegisterInfo={setRegisterInfo}
                        />
                        <AuthField
                            id="fullname"
                            label="Full Name"
                            registerInfo={registerInfo}
                            setRegisterInfo={setRegisterInfo}
                        />
                        <AuthField
                            id="username"
                            label="Username"
                            registerInfo={registerInfo}
                            setRegisterInfo={setRegisterInfo}
                        />
                        <AuthField
                            id="password"
                            label="Password"
                            registerInfo={registerInfo}
                            setRegisterInfo={setRegisterInfo}
                        />
                    </>
                )}
                <Button
                    variant="contained"
                    // add onclick event to submit form and redirects to home page
                    onClick={(e) => handleSubmit(e)}
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "#4db5f9",
                        textTransform: "unset",
                        marginTop: "10px",
                    }}
                >
                    {props.currentAuth == "Login" ? "Log in" : "Sign up"}
                </Button>
            </Box>
            {props.currentAuth == "Login" ? (
                <SwitchAuth
                    switchTo="Register"
                    setRegisterInfo={setRegisterInfo}
                />
            ) : (
                <SwitchAuth switchTo="Login" setLoginInfo={setLoginInfo} />
            )}
        </Container>
    );
}
