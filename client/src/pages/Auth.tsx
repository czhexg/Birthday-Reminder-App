import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import loginPreview from "../assets/login_preview.png";
import loginPreviewBack from "../assets/login_preview_back.png";
import AuthForm from "../components/Auth/AuthForm";

type AuthProps = {
    currentAuth: string;
};

export default function Auth(props: AuthProps): JSX.Element {
    const backImageHeight: number = 650;
    const frontImageHeight: number = 553;
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    margin: "3rem auto 0",
                    justifyContent: "center",
                }}
            >
                {/* <Container
                    sx={{
                        position: "relative",
                        height: backImageHeight,
                        width: "450px",
                        margin: 0,
                    }}
                >
                    <img
                        src={loginPreviewBack}
                        style={{
                            height: backImageHeight,
                            position: "absolute",
                        }}
                    />
                    <img
                        src={loginPreview}
                        style={{
                            height: frontImageHeight,
                            position: "absolute",
                            left: "184px",
                            top: "27px",
                        }}
                    />
                </Container> */}
                <AuthForm currentAuth={props.currentAuth} />
            </Container>
        </>
    );
}
