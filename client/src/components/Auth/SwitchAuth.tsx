import React from "react";
import { Link } from "react-router-dom";

import { Container } from "@mui/material";

import switchAuthLink from "../../componentStyles/Auth/switchAuthLink.module.css";

import { LoginStateType, RegisterStateType } from "../../types/Types";

type SwitchAuthProps = {
    switchTo: string;
    setLoginInfo?: (loginInfo: LoginStateType) => void;
    setRegisterInfo?: (registerInfo: RegisterStateType) => void;
};

function SwitchAuth(props: SwitchAuthProps): JSX.Element {
    return (
        <Container
            sx={{
                border: "1px solid #dbdbdb",
                textAlign: "center",
                paddingY: "20px",
            }}
        >
            {props.switchTo == "Login" ? (
                <>
                    Have an account?{" "}
                    <Link
                        to="../Login"
                        onClick={() => {
                            if (props.setRegisterInfo) {
                                props.setRegisterInfo({
                                    email: "",
                                    username: "",
                                    fullname: "",
                                    password: "",
                                });
                            }
                        }}
                        className={switchAuthLink["switchAuthLink"]}
                    >
                        Log in
                    </Link>
                </>
            ) : (
                <>
                    Don't have an account?{" "}
                    <Link
                        to="../Register"
                        onClick={() => {
                            if (props.setLoginInfo) {
                                props.setLoginInfo({
                                    username: "",
                                    password: "",
                                });
                            }
                        }}
                        className={switchAuthLink["switchAuthLink"]}
                    >
                        Sign up
                    </Link>
                </>
            )}
        </Container>
    );
}

export default SwitchAuth;
